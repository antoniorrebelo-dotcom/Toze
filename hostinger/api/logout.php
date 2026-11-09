<?php
require __DIR__ . '/_bootstrap.php';
require_post();
start_session();
$_SESSION = [];
$p = session_get_cookie_params();
setcookie(session_name(), '', [
    'expires' => time() - 3600,
    'path' => $p['path'],
    'secure' => $p['secure'],
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_destroy();
json_out(['success' => true]);
