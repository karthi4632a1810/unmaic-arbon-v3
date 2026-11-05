<?php
/**
 * Event Registrations REST API Endpoint
 * Stores registrations in the SQLite file database.
 */

require_once __DIR__ . '/db.php';

header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $eventId = $_GET['event_id'] ?? null;
        $pdo = Database::getConnection();

        if ($pdo) {
            if ($eventId) {
                $stmt = $pdo->prepare("SELECT * FROM registrations WHERE event_id = :id ORDER BY created_at DESC");
                $stmt->execute([':id' => $eventId]);
            } else {
                $stmt = $pdo->query("SELECT * FROM registrations ORDER BY created_at DESC LIMIT 100");
            }
            $rows = $stmt->fetchAll();
            echo json_encode(["success" => true, "data" => $rows]);
        } else {
            echo json_encode(["success" => true, "data" => []]);
        }
        break;

    case 'POST':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (!$data || empty($data['eventId']) || empty($data['email'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Event ID and email are required"]);
            exit();
        }

        $id = $data['id'] ?? ('reg_' . bin2hex(random_bytes(6)));
        $now = date('c');

        $pdo = Database::getConnection();
        if ($pdo) {
            $stmt = $pdo->prepare("
                INSERT INTO registrations (id, event_id, event_slug, full_name, email, phone, organization, ticket_tier, ticket_price, notes, created_at)
                VALUES (:id, :event_id, :event_slug, :full_name, :email, :phone, :organization, :ticket_tier, :ticket_price, :notes, :created_at)
            ");
            $success = $stmt->execute([
                ':id' => $id,
                ':event_id' => $data['eventId'],
                ':event_slug' => $data['eventSlug'] ?? '',
                ':full_name' => $data['fullName'] ?? '',
                ':email' => $data['email'],
                ':phone' => $data['phone'] ?? '',
                ':organization' => $data['organization'] ?? '',
                ':ticket_tier' => $data['ticketTierName'] ?? ($data['ticketTierId'] ?? ''),
                ':ticket_price' => $data['ticketPrice'] ?? 'Free',
                ':notes' => $data['notes'] ?? '',
                ':created_at' => $now,
            ]);

            echo json_encode(["success" => $success, "id" => $id]);
        } else {
            echo json_encode(["success" => true, "id" => $id]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
        break;
}
