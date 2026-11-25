<?php
// Código comum às fotos e vídeos enviados pelo público.
// Os ficheiros ficam FORA do public_html (não se abrem diretamente pelo endereço)
// e só são mostrados, através de envio-ficheiro.php, depois de aprovados na gestão.
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) {
    http_response_code(404);
    exit;
}

const ENVIO_DESTINO_RE = '/^(carnaval-20[0-9]{2}|evento-[a-z0-9-]{2,40})$/';
const ENVIO_FOTO_MAX = 20 * 1024 * 1024;   // 20 MB por foto (antes de reduzir)
const ENVIO_VIDEO_MAX = 300 * 1024 * 1024; // 300 MB por vídeo
const ENVIO_FOTO_LADO = 2000;              // as fotos são guardadas com no máximo 2000 px
const ENVIO_MIMES = [
    'image/jpeg' => ['foto', 'jpg'],
    'image/png' => ['foto', 'png'],
    'image/webp' => ['foto', 'webp'],
    'video/mp4' => ['video', 'mp4'],
    'video/quicktime' => ['video', 'mov'],
    'video/webm' => ['video', 'webm'],
];

// Pasta onde ficam os ficheiros. Por omissão, ao lado do public_html (fora do site público).
function envios_dir(): string
{
    static $dir = null;
    if ($dir !== null) return $dir;

    $candidatas = [];
    if (!empty(config()['envios_dir'])) $candidatas[] = rtrim(config()['envios_dir'], '/');
    $candidatas[] = dirname(__DIR__, 2) . '/osviscondes-envios';
    $candidatas[] = __DIR__ . '/_envios'; // último recurso: dentro do site, mas bloqueada pelo .htaccess

    foreach ($candidatas as $c) {
        if ((is_dir($c) || @mkdir($c, 0750, true)) && is_writable($c)) {
            if (str_starts_with($c, __DIR__)) {
                @file_put_contents($c . '/.htaccess', "Require all denied\nDeny from all\n");
            }
            return $dir = $c;
        }
    }
    error_log('osviscondes envios: nenhuma pasta com permissão de escrita');
    fail('Servidor sem espaço para guardar ficheiros.', 500);
}

// Cria a tabela na primeira utilização (MySQL na Hostinger; SQLite nos testes locais).
function envios_db(): PDO
{
    static $pronta = false;
    $pdo = db();
    if ($pronta) return $pdo;
    if ($pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'sqlite') {
        $pdo->exec("CREATE TABLE IF NOT EXISTS envios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            destino TEXT NOT NULL, ficheiro TEXT NOT NULL, tipo TEXT NOT NULL,
            mime TEXT NOT NULL, tamanho INTEGER NOT NULL,
            nome TEXT NOT NULL DEFAULT '', contacto TEXT NOT NULL DEFAULT '',
            estado TEXT NOT NULL DEFAULT 'pendente', criado_em TEXT NOT NULL)");
    } else {
        $pdo->exec("CREATE TABLE IF NOT EXISTS envios (
            id        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
            destino   VARCHAR(48)  NOT NULL,
            ficheiro  VARCHAR(80)  NOT NULL,
            tipo      VARCHAR(8)   NOT NULL,
            mime      VARCHAR(40)  NOT NULL,
            tamanho   INT          NOT NULL,
            nome      VARCHAR(80)  NOT NULL DEFAULT '',
            contacto  VARCHAR(120) NOT NULL DEFAULT '',
            estado    VARCHAR(12)  NOT NULL DEFAULT 'pendente',
            criado_em DATETIME     NOT NULL,
            KEY idx_destino_estado (destino, estado),
            KEY idx_estado (estado)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    }
    $pronta = true;
    return $pdo;
}

function envio_caminho(string $ficheiro): string
{
    // o nome é sempre gerado por nós (hex + extensão), mas confirmamos na mesma
    if (!preg_match('/^[a-f0-9]{32}\.(jpg|png|webp|mp4|mov|webm)$/', $ficheiro)) {
        fail('Ficheiro inválido.', 404);
    }
    return envios_dir() . '/' . $ficheiro;
}

function envio_publico(array $r): array
{
    return [
        'id' => (int) $r['id'],
        'tipo' => $r['tipo'],
        'nome' => $r['nome'],
        'url' => 'api/envio-ficheiro?id=' . (int) $r['id'],
    ];
}
