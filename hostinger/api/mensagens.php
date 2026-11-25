<?php
// Gestão: lista as mensagens recebidas pelo formulário (as mais recentes primeiro).
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_mensagens.php';
require_login();

$rows = mensagens_db()->query('SELECT id, nome, resposta, assunto, texto, lida, criado_em
    FROM mensagens ORDER BY id DESC LIMIT 300')->fetchAll();
foreach ($rows as &$r) {
    $r['id'] = (int) $r['id'];
    $r['lida'] = (bool) $r['lida'];
}
$porLer = (int) mensagens_db()->query('SELECT COUNT(*) FROM mensagens WHERE lida = 0')->fetchColumn();
json_out(['mensagens' => $rows, 'porLer' => $porLer]);
