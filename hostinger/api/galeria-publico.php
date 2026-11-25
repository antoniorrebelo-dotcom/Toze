<?php
// Fotos e vídeos do público já aprovados para uma galeria: ?destino=carnaval-2017
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_envios.php';

$destino = (string) ($_GET['destino'] ?? '');
if (!preg_match(ENVIO_DESTINO_RE, $destino)) fail('Galeria inválida.');

$st = envios_db()->prepare("SELECT id, tipo, nome FROM envios WHERE destino = :d AND estado = 'aprovado' ORDER BY id");
$st->execute([':d' => $destino]);
header('Cache-Control: public, max-age=120');
json_out(array_map('envio_publico', $st->fetchAll()));
