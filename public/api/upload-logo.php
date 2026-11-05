<?php
// Prevent CORS issues in API calls
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Only POST method is allowed"]);
    exit();
}

$fileField = null;
if (isset($_FILES['logo'])) {
    $fileField = 'logo';
} elseif (isset($_FILES['file'])) {
    $fileField = 'file';
}

if (!$fileField || empty($_FILES[$fileField]['name'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "No file uploaded. Expected 'logo' or 'file' form field."]);
    exit();
}

$file = $_FILES[$fileField];

// Check for PHP upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "PHP upload error code: " . $file['error']]);
    exit();
}

// Validate file size (max 8MB)
$maxSizeBytes = 8 * 1024 * 1024;
if ($file['size'] > $maxSizeBytes) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "File exceeds 8MB size limit."]);
    exit();
}

// Validate allowed image extensions & MIME types
$allowedExtensions = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'];
$pathInfo = pathinfo($file['name']);
$extension = strtolower($pathInfo['extension'] ?? '');

if (!in_array($extension, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid file extension. Allowed: PNG, JPG, JPEG, SVG, WEBP, GIF."]);
    exit();
}

// Destination directory
$uploadDir = __DIR__ . '/../uploads/logos/';
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Failed to create uploads directory."]);
        exit();
    }
}

// Generate unique, sanitized filename
$safeBaseName = preg_replace('/[^a-zA-Z0-9_\-]/', '', $pathInfo['filename']);
$uniqueFilename = 'logo_' . time() . '_' . substr(md5(uniqid()), 0, 8) . '.' . $extension;
$destinationPath = $uploadDir . $uniqueFilename;

if (move_uploaded_file($file['tmp_name'], $destinationPath)) {
    $publicUrl = '/uploads/logos/' . $uniqueFilename;
    echo json_encode([
        "success" => true,
        "url" => $publicUrl,
        "filename" => $uniqueFilename,
        "size" => $file['size'],
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Failed to save uploaded file on server."]);
}
?>
