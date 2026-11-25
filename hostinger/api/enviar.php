<?php
// Recebe UMA foto ou UM vídeo enviado pelo público (multipart/form-data).
// Campos: destino, nome (opcional), contacto (opcional), autorizo=1, ficheiro, site (armadilha: tem de vir vazio).
// Fica "pendente" até alguém da organização aprovar na gestão.
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_envios.php';
require_post();

// Armadilha para robôs: campo escondido que as pessoas não preenchem.
if (trim((string) ($_POST['site'] ?? '')) !== '') {
    json_out(['success' => true]);
}

// Limite: 60 ficheiros por hora por endereço IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$limFile = sys_get_temp_dir() . '/osv_envios_' . hash('sha256', $ip . __DIR__);
$lim = ['n' => 0, 'since' => time()];
if (is_file($limFile)) {
    $s = json_decode((string) file_get_contents($limFile), true);
    if (is_array($s) && time() - ($s['since'] ?? 0) < 3600) $lim = $s;
}
if ($lim['n'] >= 60) {
    fail('Recebemos muitos ficheiros seguidos. Tente outra vez daqui a uma hora.', 429);
}

$destino = (string) ($_POST['destino'] ?? '');
if (!preg_match(ENVIO_DESTINO_RE, $destino)) fail('Escolha o Carnaval ou o evento.');
if (($_POST['autorizo'] ?? '') !== '1') fail('É preciso autorizar a publicação.');
$nome = mb_substr(trim(strip_tags((string) ($_POST['nome'] ?? ''))), 0, 80);
$contacto = mb_substr(trim(strip_tags((string) ($_POST['contacto'] ?? ''))), 0, 120);

$f = $_FILES['ficheiro'] ?? null;
if (!$f || !is_array($f) || is_array($f['error'])) fail('Nenhum ficheiro recebido.');
if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE) {
    fail('O ficheiro é grande demais.', 413);
}
if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) fail('O envio falhou. Tente outra vez.');

$mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']) ?: '';
if (!isset(ENVIO_MIMES[$mime])) {
    fail('Formato não aceite. Envie fotos JPG, PNG ou WEBP, ou vídeos MP4 ou MOV.', 415);
}
[$tipo, $ext] = ENVIO_MIMES[$mime];
$tamanho = (int) $f['size'];
if ($tipo === 'foto' && $tamanho > ENVIO_FOTO_MAX) fail('A foto é grande demais (máx. 20 MB).', 413);
if ($tipo === 'video' && $tamanho > ENVIO_VIDEO_MAX) fail('O vídeo é grande demais (máx. 300 MB).', 413);

$nomeFicheiro = bin2hex(random_bytes(16)) . '.' . ($tipo === 'foto' ? 'jpg' : $ext);
$destinoFicheiro = envios_dir() . '/' . $nomeFicheiro;

if ($tipo === 'foto') {
    // Volta a gravar a foto: tira os dados escondidos (ex.: localização GPS) e reduz o tamanho.
    $info = @getimagesize($f['tmp_name']);
    if (!$info || $info[0] < 1 || $info[1] < 1 || $info[0] * $info[1] > 60_000_000) fail('Foto inválida.');
    @ini_set('memory_limit', '512M');
    $img = @imagecreatefromstring((string) file_get_contents($f['tmp_name']));
    if (!$img) fail('Não foi possível ler a foto.');
    if ($mime === 'image/jpeg' && function_exists('exif_read_data')) {
        $o = (int) (@exif_read_data($f['tmp_name'])['Orientation'] ?? 1);
        if ($o === 3) $img = imagerotate($img, 180, 0);
        if ($o === 6) $img = imagerotate($img, -90, 0);
        if ($o === 8) $img = imagerotate($img, 90, 0);
    }
    $w = imagesx($img);
    $h = imagesy($img);
    $k = min(1, ENVIO_FOTO_LADO / max($w, $h));
    $nw = max(1, (int) round($w * $k));
    $nh = max(1, (int) round($h * $k));
    $out = imagecreatetruecolor($nw, $nh);
    imagefill($out, 0, 0, imagecolorallocate($out, 255, 255, 255)); // fundo branco para PNG transparente
    imagecopyresampled($out, $img, 0, 0, 0, 0, $nw, $nh, $w, $h);
    if (!imagejpeg($out, $destinoFicheiro, 85)) fail('Não foi possível guardar a foto.', 500);
    $mime = 'image/jpeg';
    $tamanho = (int) filesize($destinoFicheiro);
} else {
    if (!move_uploaded_file($f['tmp_name'], $destinoFicheiro)) fail('Não foi possível guardar o vídeo.', 500);
}
@chmod($destinoFicheiro, 0640);

try {
    $st = envios_db()->prepare('INSERT INTO envios (destino, ficheiro, tipo, mime, tamanho, nome, contacto, estado, criado_em)
        VALUES (:d, :f, :t, :m, :s, :n, :c, \'pendente\', :q)');
    $st->execute([
        ':d' => $destino, ':f' => $nomeFicheiro, ':t' => $tipo, ':m' => $mime, ':s' => $tamanho,
        ':n' => $nome, ':c' => $contacto, ':q' => date('Y-m-d H:i:s'),
    ]);
} catch (PDOException $e) {
    @unlink($destinoFicheiro);
    error_log('enviar: ' . $e->getMessage());
    fail('Erro na base de dados.', 500);
}

$lim['n']++;
@file_put_contents($limFile, json_encode($lim), LOCK_EX);
json_out(['success' => true, 'tipo' => $tipo]);
