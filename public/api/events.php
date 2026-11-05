<?php
/**
 * Events REST API Endpoint
 * Handles CRUD operations using the SQLite file database.
 */

require_once __DIR__ . '/db.php';

header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        $slug = $_GET['slug'] ?? null;

        if ($id || $slug) {
            $event = get_event_by_id_or_slug($id ?: $slug);
            if ($event) {
                echo json_encode(["success" => true, "data" => $event]);
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "error" => "Event not found"]);
            }
        } else {
            $events = get_all_events();
            echo json_encode(["success" => true, "data" => $events]);
        }
        break;

    case 'POST':
    case 'PUT':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (!$data || !is_array($data)) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Invalid JSON payload"]);
            exit();
        }

        $success = save_event_to_db($data);
        if ($success) {
            echo json_encode(["success" => true, "data" => $data]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Failed to save event to database file"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $raw = file_get_contents('php://input');
            $body = json_decode($raw, true);
            $id = $body['id'] ?? null;
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Event ID is required"]);
            exit();
        }

        $success = delete_event_from_db($id);
        echo json_encode(["success" => $success]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
        break;
}
