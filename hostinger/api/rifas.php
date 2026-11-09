<?php
// Devolve todas as rifas (só com sessão iniciada).
require __DIR__ . '/_bootstrap.php';
require_login();

$rows = db()->query('SELECT id, position, seller, buyer, ranking FROM rifas WHERE id <= 2000 ORDER BY id')->fetchAll();
foreach ($rows as &$r) {
    $r['id'] = (int) $r['id'];
    $r['ranking'] = (int) $r['ranking'];
    $r['position'] = trim((string) $r['position']) === '' ? '0' : (string) $r['position'];
}
json_out($rows);
