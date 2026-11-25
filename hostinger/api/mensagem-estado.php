<?php
// Gestão: marca uma mensagem como lida / por ler, ou apaga-a.
// { "id": 5, "acao": "lida" | "por-ler" | "apagar" }
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_mensagens.php';
require_post();
require_login();

$in = read_json();
$id = (int) ($in['id'] ?? 0);
$acao = (string) ($in['acao'] ?? '');
$pdo = mensagens_db();

if ($acao === 'apagar') {
    $pdo->prepare('DELETE FROM mensagens WHERE id = :id')->execute([':id' => $id]);
} elseif ($acao === 'lida' || $acao === 'por-ler') {
    $pdo->prepare('UPDATE mensagens SET lida = :l WHERE id = :id')->execute([':l' => $acao === 'lida' ? 1 : 0, ':id' => $id]);
} else {
    fail('Ação inválida.');
}
json_out(['success' => true]);
