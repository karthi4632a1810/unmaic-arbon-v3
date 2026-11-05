<?php
/**
 * Generic Image Upload Endpoint (Speakers photos, hero backgrounds, section images, logos)
 * Stores files under public/uploads/<folder>/
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

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
foreach (['image', 'file', 'photo', 'speaker', 'avatar', 'hero', 'logo'] as $field) {
    if (isset($_FILES[$field]) && !empty($_FILES[$field]['name'])) {
        $fileField = $field;
        break;
    }
}

if (!$fileField) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "No image file uploaded."]);
    exit();
}

$file = $_FILES[$fileField];

if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "PHP upload error code: " . $file['error']]);
    exit();
}

// Max 15MB
$maxSizeBytes = 15 * 1024 * 1024;
if ($file['size'] > $maxSizeBytes) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "File exceeds 15MB size limit."]);
    exit();
}

$allowedExtensions = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'avif'];
$pathInfo = pathinfo($file['name']);
$extension = strtolower($pathInfo['extension'] ?? '');

if (!in_array($extension, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid file extension. Allowed: PNG, JPG, JPEG, SVG, WEBP, GIF, AVIF."]);
    exit();
}

// Subfolder categorization (e.g. speakers, hero, about, logos)
$rawFolder = $_POST['folder'] ?? $_POST['category'] ?? 'speakers';
$folder = preg_replace('/[^a-zA-Z0-9_-]/', '', $rawFolder);
if (empty($folder)) {
    $folder = 'images';
}

$uploadDir = __DIR__ . '/../uploads/' . $folder . '/';
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Failed to create uploads directory."]);
        exit();
    }
}

$prefix = substr($folder, 0, 8);
$filename = $prefix . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
$destination = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $publicUrl = '/uploads/' . $folder . '/' . $filename;
    echo json_encode([
        "success" => true,
        "url" => $publicUrl,
        "filename" => $filename,
        "folder" => $folder,
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Failed to move uploaded file."]);
}
