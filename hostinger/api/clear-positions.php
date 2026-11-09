<?php
// Limpa todas as posições da grelha (novo sorteio).
require __DIR__ . '/_bootstrap.php';
require_post();
require_login();
$n = db()->exec("UPDATE rifas SET position = '0'");
json_out(['success' => true, 'rowsAffected' => $n]);
