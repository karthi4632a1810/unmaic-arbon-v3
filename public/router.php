<?php
/**
 * PHP Built-in Server Router for Production & Local Testing
 * 
 * Run with:
 * php -S 0.0.0.0:8000 -t dist dist/router.php
 * or
 * php -S 0.0.0.0:8000 -t public public/router.php
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$docRoot = __DIR__;

// Execute existing PHP scripts
if (str_ends_with($uri, '.php') && file_exists($docRoot . $uri)) {
    require $docRoot . $uri;
    exit();
}

// Check for extensionless /api/<endpoint>
if (str_starts_with($uri, '/api/')) {
    $targetPhp = $docRoot . $uri . '.php';
    if (file_exists($targetPhp)) {
        require $targetPhp;
        exit();
    }
}

// Serve existing static file directly
if ($uri !== '/' && file_exists($docRoot . $uri) && !is_dir($docRoot . $uri)) {
    return false;
}

// Single Page Application: Fallback to index.html
if (file_exists($docRoot . '/index.html')) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($docRoot . '/index.html');
    exit();
}

return false;
