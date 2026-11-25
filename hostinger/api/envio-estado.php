<?php
// Gestão: aprova, muda de galeria ou apaga um envio do público.
// { "id": 5, "acao": "aprovar" | "apagar" | "pendente", "destino": "carnaval-2017" (opcional) }
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_envios.php';
require_post();
require_login();

$in = read_json();
$id = (int) ($in['id'] ?? 0);
$acao = (string) ($in['acao'] ?? '');
$destino = isset($in['destino']) ? (string) $in['destino'] : null;
if ($destino !== null && !preg_match(ENVIO_DESTINO_RE, $destino)) fail('Galeria inválida.');

$pdo = envios_db();
$st = $pdo->prepare('SELECT ficheiro FROM envios WHERE id = :id');
$st->execute([':id' => $id]);
$r = $st->fetch();
if (!$r) fail('Envio não encontrado.', 404);

if ($acao === 'apagar') {
    @unlink(envio_caminho($r['ficheiro']));
    $pdo->prepare('DELETE FROM envios WHERE id = :id')->execute([':id' => $id]);
    json_out(['success' => true]);
}
if ($acao !== 'aprovar' && $acao !== 'pendente' && $acao !== 'destino') fail('Ação inválida.');

$sets = [];
$args = [':id' => $id];
if ($acao === 'aprovar') $sets[] = "estado = 'aprovado'";
if ($acao === 'pendente') $sets[] = "estado = 'pendente'";
if ($destino !== null) {
    $sets[] = 'destino = :d';
    $args[':d'] = $destino;
}
if (!$sets) fail('Nada para alterar.');
$pdo->prepare('UPDATE envios SET ' . implode(', ', $sets) . ' WHERE id = :id')->execute($args);
json_out(['success' => true]);
