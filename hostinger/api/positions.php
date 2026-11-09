<?php
// Grava as posições na grelha: { "updates": [ { "id": 5, "position": "A1" }, ... ] }
// "0" = sem posição. Quem estiver na posição pedida perde-a.
require __DIR__ . '/_bootstrap.php';
require_post();
require_login();

$in = read_json();
$updates = $in['updates'] ?? null;
if (!is_array($updates) || count($updates) === 0 || count($updates) > TOTAL_RIFAS) {
    fail('Nada para gravar.');
}
$clean = [];
foreach ($updates as $u) {
    $id = (int) ($u['id'] ?? 0);
    $pos = strtoupper(trim((string) ($u['position'] ?? '')));
    if ($id < 1 || $id > TOTAL_RIFAS) fail('Número inválido: ' . ($u['id'] ?? ''));
    if ($pos !== '0' && !preg_match(POSITION_RE, $pos)) fail('Posição inválida: ' . $pos);
    $clean[] = [$id, $pos];
}

$pdo = db();
try {
    $pdo->beginTransaction();
    $free = $pdo->prepare("UPDATE rifas SET position = '0' WHERE position = :p AND id <> :id");
    $set = $pdo->prepare('UPDATE rifas SET position = :p WHERE id = :id');
    foreach ($clean as [$id, $pos]) {
        if ($pos !== '0') $free->execute([':p' => $pos, ':id' => $id]);
        $set->execute([':p' => $pos, ':id' => $id]);
    }
    $pdo->commit();
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    error_log('positions: ' . $e->getMessage());
    fail('Erro na base de dados.', 500);
}
json_out(['success' => true, 'saved' => count($clean)]);
