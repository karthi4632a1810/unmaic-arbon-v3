<?php
/**
 * Database Connection & Migration (SQLite File-based Database)
 * Acts like MySQL in file-mode without needing an external MySQL server daemon.
 */

// Allow CORS
if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dbFile = __DIR__ . '/events.db';
$jsonFallbackFile = __DIR__ . '/events_fallback.json';

class Database {
    private static ?PDO $pdo = null;
    private static bool $useJsonFallback = false;

    public static function getConnection(): ?PDO {
        global $dbFile;
        if (self::$useJsonFallback) {
            return null;
        }

        if (self::$pdo === null) {
            try {
                // Connect to SQLite file-based database
                self::$pdo = new PDO("sqlite:" . $dbFile);
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

                // Initialize tables (MySQL compatible schema in SQLite file mode)
                self::initTables();
            } catch (Exception $e) {
                // If PDO SQLite extension is missing, fall back to JSON file mode
                self::$useJsonFallback = true;
                return null;
            }
        }
        return self::$pdo;
    }

    private static function initTables(): void {
        if (!self::$pdo) return;

        self::$pdo->exec("
            CREATE TABLE IF NOT EXISTS events (
                id TEXT PRIMARY KEY,
                slug TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                status TEXT DEFAULT 'draft',
                published INTEGER DEFAULT 0,
                data TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS registrations (
                id TEXT PRIMARY KEY,
                event_id TEXT NOT NULL,
                event_slug TEXT,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                organization TEXT,
                ticket_tier TEXT,
                ticket_price TEXT,
                notes TEXT,
                created_at TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
            CREATE INDEX IF NOT EXISTS idx_reg_event ON registrations(event_id);
        ");
    }

    // JSON Fallback methods if SQLite driver is not enabled
    public static function getJsonEvents(): array {
        global $jsonFallbackFile;
        if (!file_exists($jsonFallbackFile)) {
            return [];
        }
        $content = file_get_contents($jsonFallbackFile);
        $data = json_decode($content, true);
        return is_array($data) ? $data : [];
    }

    public static function saveJsonEvents(array $events): void {
        global $jsonFallbackFile;
        file_put_contents($jsonFallbackFile, json_encode($events, JSON_PRETTY_PRINT));
    }
}

// Helper query wrappers
function get_all_events(): array {
    $pdo = Database::getConnection();
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM events ORDER BY updated_at DESC");
        $rows = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $parsed = json_decode($row['data'], true);
            if ($parsed) {
                $result[] = $parsed;
            }
        }
        return $result;
    }
    return Database::getJsonEvents();
}

function get_event_by_id_or_slug(string $idOrSlug): ?array {
    $pdo = Database::getConnection();
    if ($pdo) {
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = :id OR slug = :slug LIMIT 1");
        $stmt->execute([':id' => $idOrSlug, ':slug' => $idOrSlug]);
        $row = $stmt->fetch();
        if ($row) {
            return json_decode($row['data'], true);
        }
        return null;
    }

    $events = Database::getJsonEvents();
    foreach ($events as $e) {
        if (($e['id'] ?? '') === $idOrSlug || ($e['slug'] ?? '') === $idOrSlug) {
            return $e;
        }
    }
    return null;
}

function save_event_to_db(array $event): bool {
    $id = $event['id'] ?? ('evt_' . bin2hex(random_bytes(6)));
    $slug = $event['slug'] ?? ('event-' . time());
    $name = $event['name'] ?? 'Untitled Event';
    $status = $event['status'] ?? 'draft';
    $published = !empty($event['published']) ? 1 : 0;
    $now = date('c');
    $createdAt = $event['createdAt'] ?? $now;
    $updatedAt = $now;

    $event['id'] = $id;
    $event['slug'] = $slug;
    $event['updatedAt'] = $updatedAt;
    $json = json_encode($event);

    $pdo = Database::getConnection();
    if ($pdo) {
        $stmt = $pdo->prepare("
            INSERT INTO events (id, slug, name, status, published, data, created_at, updated_at)
            VALUES (:id, :slug, :name, :status, :published, :data, :created_at, :updated_at)
            ON CONFLICT(id) DO UPDATE SET
                slug = excluded.slug,
                name = excluded.name,
                status = excluded.status,
                published = excluded.published,
                data = excluded.data,
                updated_at = excluded.updated_at
        ");

        return $stmt->execute([
            ':id' => $id,
            ':slug' => $slug,
            ':name' => $name,
            ':status' => $status,
            ':published' => $published,
            ':data' => $json,
            ':created_at' => $createdAt,
            ':updated_at' => $updatedAt,
        ]);
    }

    // JSON Fallback
    $events = Database::getJsonEvents();
    $found = false;
    foreach ($events as $idx => $e) {
        if (($e['id'] ?? '') === $id) {
            $events[$idx] = $event;
            $found = true;
            break;
        }
    }
    if (!$found) {
        array_unshift($events, $event);
    }
    Database::saveJsonEvents($events);
    return true;
}

function delete_event_from_db(string $id): bool {
    $pdo = Database::getConnection();
    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    $events = Database::getJsonEvents();
    $events = array_values(array_filter($events, fn($e) => ($e['id'] ?? '') !== $id));
    Database::saveJsonEvents($events);
    return true;
}
