<?php
// Gestão: lista os envios do público. ?estado=pendente (por omissão) ou ?estado=aprovado
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_envios.php';
require_login();

$estado = ($_GET['estado'] ?? 'pendente') === 'aprovado' ? 'aprovado' : 'pendente';
$st = envios_db()->prepare('SELECT id, destino, tipo, tamanho, nome, contacto, criado_em FROM envios
    WHERE estado = :e ORDER BY id DESC LIMIT 500');
$st->execute([':e' => $estado]);
$rows = $st->fetchAll();
foreach ($rows as &$r) {
    $r['id'] = (int) $r['id'];
    $r['tamanho'] = (int) $r['tamanho'];
    $r['url'] = 'api/envio-ficheiro?id=' . $r['id'];
}
$pend = (int) envios_db()->query("SELECT COUNT(*) FROM envios WHERE estado = 'pendente'")->fetchColumn();
json_out(['envios' => $rows, 'pendentes' => $pend]);
