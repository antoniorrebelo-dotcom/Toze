<?php
// Mostra uma foto ou vídeo enviado pelo público.
// Aprovado: qualquer pessoa vê. Pendente: só com sessão iniciada (para a gestão poder rever).
// Aceita pedidos "Range", para os vídeos poderem avançar e tocar no iPhone.
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_envios.php';

$id = (int) ($_GET['id'] ?? 0);
$st = envios_db()->prepare('SELECT ficheiro, mime, estado FROM envios WHERE id = :id');
$st->execute([':id' => $id]);
$r = $st->fetch();
if (!$r) fail('Não encontrado.', 404);
if ($r['estado'] !== 'aprovado') require_login();

$path = envio_caminho($r['ficheiro']);
if (!is_file($path)) fail('Não encontrado.', 404);

$size = filesize($path);
$start = 0;
$end = $size - 1;
header_remove('Content-Type');
header('Content-Type: ' . $r['mime']);
header('Accept-Ranges: bytes');
header($r['estado'] === 'aprovado' ? 'Cache-Control: public, max-age=604800' : 'Cache-Control: private, no-store');

if (isset($_SERVER['HTTP_RANGE']) && preg_match('/^bytes=(\d*)-(\d*)$/', $_SERVER['HTTP_RANGE'], $m)) {
    if ($m[1] === '' && $m[2] !== '') {
        $start = max(0, $size - (int) $m[2]);
    } else {
        $start = (int) $m[1];
        if ($m[2] !== '') $end = min($end, (int) $m[2]);
    }
    if ($start > $end || $start >= $size) {
        header("Content-Range: bytes */$size");
        http_response_code(416);
        exit;
    }
    http_response_code(206);
    header("Content-Range: bytes $start-$end/$size");
}
header('Content-Length: ' . ($end - $start + 1));

$fh = fopen($path, 'rb');
fseek($fh, $start);
$falta = $end - $start + 1;
while ($falta > 0 && !feof($fh)) {
    $bloco = fread($fh, min(1 << 16, $falta));
    echo $bloco;
    $falta -= strlen($bloco);
    flush();
}
fclose($fh);
