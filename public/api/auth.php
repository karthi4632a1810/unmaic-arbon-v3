<?php
/**
 * Admin Authentication Endpoint (UNMAI Event Builder)
 * 
 * Supports credentials:
 * Username: admin
 * Password: admin@123
 */

require_once __DIR__ . '/db.php';

header("Content-Type: application/json; charset=UTF-8");

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: [];

$action = $data['action'] ?? $_GET['action'] ?? 'login';

$VALID_USERNAME = 'admin';
$VALID_PASSWORD = 'admin@123';

if ($action === 'login') {
    $username = trim($data['username'] ?? '');
    $password = (string)($data['password'] ?? '');

    // Allow 'admin' or full institutional email 'admin@unmaicarbon.earth'
    $isUserValid = (strtolower($username) === $VALID_USERNAME || strtolower($username) === 'admin@unmaicarbon.earth');
    $isPassValid = ($password === $VALID_PASSWORD);

    if ($isUserValid && $isPassValid) {
        $token = 'unmai_auth_' . bin2hex(random_bytes(24)) . '_' . time();
        $user = [
            'username' => 'admin',
            'name' => 'Institutional Administrator',
            'email' => 'admin@unmaicarbon.earth',
            'role' => 'Super Administrator',
            'lastLogin' => date('c'),
        ];

        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => $user,
            'message' => 'Authentication successful'
        ]);
        exit();
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
        exit();
    }
}

if ($action === 'check') {
    $token = $data['token'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!empty($token)) {
        echo json_encode([
            'success' => true,
            'authenticated' => true,
            'user' => [
                'username' => 'admin',
                'name' => 'Institutional Administrator',
                'email' => 'admin@unmaicarbon.earth',
                'role' => 'Super Administrator'
            ]
        ]);
        exit();
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'authenticated' => false,
            'message' => 'No active session token'
        ]);
        exit();
    }
}

if ($action === 'logout') {
    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
    exit();
}

http_response_code(400);
echo json_encode([
    'success' => false,
    'message' => 'Invalid request action'
]);
