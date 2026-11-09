<?php
// Importa dados (exportação JSON da tabela "rifas" no phpMyAdmin, ou lista [{id, position, ranking}]).
require __DIR__ . '/_bootstrap.php';
require_post();
require_login();

$data = read_json();
$rows = null;
foreach ($data as $item) {
    if (is_array($item) && ($item['type'] ?? '') === 'table' && is_array($item['data'] ?? null)) {
        $rows = $item['data'];
        break;
    }
}
if ($rows === null && isset($data['rows']) && is_array($data['rows'])) $rows = $data['rows'];
if ($rows === null && isset($data[0]) && is_array($data[0]) && isset($data[0]["id"])) $rows = $data;
if ($rows === null) fail('Ficheiro não reconhecido. Exporte a tabela rifas em formato JSON.');

$pdo = db();
$n = 0;
try {
    $pdo->beginTransaction();
    $st = $pdo->prepare('UPDATE rifas SET position = :p, ranking = :r, seller = :s, buyer = :b WHERE id = :id');
    foreach ($rows as $row) {
        $id = (int) ($row['id'] ?? 0);
        if ($id < 1 || $id > TOTAL_RIFAS) continue;
        $pos = strtoupper(trim((string) ($row['position'] ?? '0')));
        if ($pos !== '0' && !preg_match(POSITION_RE, $pos)) $pos = '0';
        $r = (int) ($row['ranking'] ?? 0);
        $st->execute([
            ':p' => $pos,
            ':r' => in_array($r, [1, 2, 3], true) ? $r : 0,
            ':s' => mb_substr((string) ($row['seller'] ?? ''), 0, 100),
            ':b' => mb_substr((string) ($row['buyer'] ?? ''), 0, 100),
            ':id' => $id,
        ]);
        $n++;
    }
    $pdo->commit();
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    error_log('import: ' . $e->getMessage());
    fail('Erro na base de dados.', 500);
}
json_out(['success' => true, 'imported' => $n, 'total' => TOTAL_RIFAS]);
