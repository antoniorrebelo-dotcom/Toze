<?php
// Limpa os vencedores (1.º, 2.º e 3.º).
require __DIR__ . '/_bootstrap.php';
require_post();
require_login();
$n = db()->exec('UPDATE rifas SET ranking = 0');
json_out(['success' => true, 'rowsAffected' => $n]);
