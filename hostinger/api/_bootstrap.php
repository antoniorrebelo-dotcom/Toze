<?php
// Código comum a todos os endpoints (versão Hostinger): configuração, sessão, base de dados, JSON.
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) {
    http_response_code(404);
    exit;
}

ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function json_out($data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $file = __DIR__ . '/config.php';
        if (!is_file($file)) {
            error_log('osviscondes: falta o ficheiro api/config.php');
            json_out(['success' => false, 'error' => 'Servidor não configurado.'], 500);
        }
        $cfg = require $file;
    }
    return $cfg;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $c = config()['db'];
        $dsn = $c['dsn'] ?? sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            $c['host'],
            $c['name'],
            $c['charset'] ?? 'utf8mb4'
        );
        try {
            $pdo = new PDO($dsn, $c['user'] ?? null, $c['password'] ?? null, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            error_log('osviscondes DB: ' . $e->getMessage());
            json_out(['success' => false, 'error' => 'Erro de ligação à base de dados.'], 500);
        }
    }
    return $pdo;
}

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_name('osv_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $https,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();

    $lifetime = (int) (config()['session_lifetime'] ?? 28800);
    if (isset($_SESSION['last_seen']) && time() - $_SESSION['last_seen'] > $lifetime) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['last_seen'] = time();
}

// Pedidos que alteram dados: só POST e só vindos da nossa própria app
// (o cabeçalho X-Requested-With não pode ser enviado por formulários de outros sites).
function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        json_out(['success' => false, 'error' => 'Método não permitido.'], 405);
    }
    if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'osviscondes') {
        json_out(['success' => false, 'error' => 'Pedido inválido.'], 403);
    }
}

function require_login(): string
{
    start_session();
    if (empty($_SESSION['user'])) {
        json_out(['success' => false, 'error' => 'Sessão expirada. Entre novamente.'], 401);
    }
    session_write_close(); // liberta a sessão para pedidos em paralelo
    return $_SESSION['user'];
}

function read_json(): array
{
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    return is_array($data) ? $data : [];
}

const TOTAL_RIFAS = 2000;
const POSITION_RE = '/^[A-Z]{1,2}[1-9][0-9]{0,2}$/';

function fail(string $error, int $status = 400): void
{
    json_out(['success' => false, 'error' => $error], $status);
}
