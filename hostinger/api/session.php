<?php
require __DIR__ . '/_bootstrap.php';
start_session();
json_out([
    'authenticated' => !empty($_SESSION['user']),
    'user' => $_SESSION['user'] ?? null,
]);
