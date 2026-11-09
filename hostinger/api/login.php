<?php
require __DIR__ . '/_bootstrap.php';
require_post();

// Limite de tentativas: 5 falhas em 15 minutos por endereço IP.
const MAX_FAILS = 5;
const WINDOW = 900;

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lockFile = sys_get_temp_dir() . '/osv_login_' . hash('sha256', $ip . __DIR__);
$state = ['fails' => 0, 'since' => time()];
if (is_file($lockFile)) {
    $saved = json_decode((string) file_get_contents($lockFile), true);
    if (is_array($saved) && time() - ($saved['since'] ?? 0) < WINDOW) {
        $state = $saved;
    }
}
if ($state['fails'] >= MAX_FAILS) {
    $wait = (int) ceil((WINDOW - (time() - $state['since'])) / 60);
    json_out(['success' => false, 'error' => "Demasiadas tentativas. Tente daqui a {$wait} min."], 429);
}

$in = read_json();
$username = trim((string) ($in['username'] ?? ''));
$password = (string) ($in['password'] ?? '');
$users = config()['users'] ?? [];

// Compara sempre com um hash (mesmo que o utilizador não exista) para não revelar nomes válidos.
$hash = $users[$username] ?? password_hash('utilizador-inexistente', PASSWORD_DEFAULT);
$ok = $username !== '' && isset($users[$username]) && password_verify($password, $hash);

if (!$ok) {
    $state['fails']++;
    @file_put_contents($lockFile, json_encode($state), LOCK_EX);
    usleep(400000);
    json_out(['success' => false, 'error' => 'Utilizador ou palavra-passe incorretos.'], 401);
}

@unlink($lockFile);
start_session();
session_regenerate_id(true);
$_SESSION['user'] = $username;
$_SESSION['last_seen'] = time();
json_out(['success' => true, 'user' => $username]);
