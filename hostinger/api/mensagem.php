<?php
// Recebe uma mensagem do formulário da página Contactos:
// { nome, resposta (email ou telefone), assunto, texto, site (armadilha: tem de vir vazio) }
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_mensagens.php';
require_post();

$in = read_json();

// Armadilha para robôs: finge que correu bem e não guarda nada.
if (trim((string) ($in['site'] ?? '')) !== '') {
    json_out(['success' => true]);
}

// Limite: 5 mensagens por hora por endereço IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$limFile = sys_get_temp_dir() . '/osv_msg_' . hash('sha256', $ip . __DIR__);
$lim = ['n' => 0, 'since' => time()];
if (is_file($limFile)) {
    $s = json_decode((string) file_get_contents($limFile), true);
    if (is_array($s) && time() - ($s['since'] ?? 0) < 3600) $lim = $s;
}
if ($lim['n'] >= 5) fail('Já recebemos várias mensagens suas. Tente outra vez daqui a uma hora.', 429);

$limpo = fn ($v, $max) => mb_substr(trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', strip_tags((string) $v))), 0, $max);
$nome = $limpo($in['nome'] ?? '', 80);
$resposta = $limpo(str_replace(["\r", "\n"], ' ', (string) ($in['resposta'] ?? '')), 120);
$assunto = (string) ($in['assunto'] ?? '');
$texto = $limpo($in['texto'] ?? '', 4000);

if ($nome === '') fail('Falta o seu nome.');
$nome = str_replace(["\r", "\n"], ' ', $nome);
$ehEmail = (bool) filter_var($resposta, FILTER_VALIDATE_EMAIL);
$ehTelefone = (bool) preg_match('/^\+?[0-9 ()-]{9,20}$/', $resposta);
if (!$ehEmail && !$ehTelefone) fail('Indique um email ou um telefone para lhe respondermos.');
if (!in_array($assunto, MENSAGEM_ASSUNTOS, true)) fail('Escolha o assunto.');
if (mb_strlen($texto) < 5) fail('A mensagem está vazia.');

try {
    mensagens_db()->prepare('INSERT INTO mensagens (nome, resposta, assunto, texto, lida, criado_em)
        VALUES (:n, :r, :a, :t, 0, :q)')->execute([
        ':n' => $nome, ':r' => $resposta, ':a' => $assunto, ':t' => $texto, ':q' => date('Y-m-d H:i:s'),
    ]);
} catch (PDOException $e) {
    error_log('mensagem: ' . $e->getMessage());
    fail('Erro na base de dados. Tente outra vez ou escreva para osviscondes@gmail.com.', 500);
}

$lim['n']++;
@file_put_contents($limFile, json_encode($lim), LOCK_EX);
mensagem_avisar($nome, $resposta, $assunto, $texto);
json_out(['success' => true]);
