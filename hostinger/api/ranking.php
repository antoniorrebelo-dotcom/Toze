<?php
// Marca um número como 1.º, 2.º ou 3.º prémio: { "id": 7, "ranking": 1 }
require __DIR__ . '/_bootstrap.php';
require_post();
require_login();

$in = read_json();
$id = (int) ($in['id'] ?? 0);
$ranking = (int) ($in['ranking'] ?? 0);
if ($id < 1 || $id > TOTAL_RIFAS || $ranking < 1 || $ranking > 3) {
    fail('Parâmetros inválidos.');
}

$pdo = db();
try {
    $pdo->beginTransaction();
    $pdo->prepare('UPDATE rifas SET ranking = 0 WHERE ranking = :r AND id <> :id')
        ->execute([':r' => $ranking, ':id' => $id]);
    $pdo->prepare('UPDATE rifas SET ranking = :r WHERE id = :id')
        ->execute([':r' => $ranking, ':id' => $id]);
    $pdo->commit();
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    error_log('ranking: ' . $e->getMessage());
    fail('Erro na base de dados.', 500);
}
json_out(['success' => true, 'id' => $id, 'ranking' => $ranking]);
