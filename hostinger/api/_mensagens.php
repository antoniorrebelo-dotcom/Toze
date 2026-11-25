<?php
// Código comum às mensagens enviadas pelo formulário da página Contactos.
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) {
    http_response_code(404);
    exit;
}

const MENSAGEM_ASSUNTOS = ['Convite', 'Cocoloto', 'Eventos', 'Outro'];

// Cria a tabela na primeira utilização (MySQL na Hostinger; SQLite nos testes locais).
function mensagens_db(): PDO
{
    static $pronta = false;
    $pdo = db();
    if ($pronta) return $pdo;
    if ($pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'sqlite') {
        $pdo->exec("CREATE TABLE IF NOT EXISTS mensagens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL, resposta TEXT NOT NULL, assunto TEXT NOT NULL,
            texto TEXT NOT NULL, lida INTEGER NOT NULL DEFAULT 0, criado_em TEXT NOT NULL)");
    } else {
        $pdo->exec("CREATE TABLE IF NOT EXISTS mensagens (
            id        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nome      VARCHAR(80)  NOT NULL,
            resposta  VARCHAR(120) NOT NULL,
            assunto   VARCHAR(20)  NOT NULL,
            texto     TEXT         NOT NULL,
            lida      TINYINT      NOT NULL DEFAULT 0,
            criado_em DATETIME     NOT NULL,
            KEY idx_lida (lida)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    }
    $pronta = true;
    return $pdo;
}

// Aviso por email à organização. Se falhar, a mensagem fica na gestão na mesma.
function mensagem_avisar(string $nome, string $resposta, string $assunto, string $texto): void
{
    $para = config()['mensagens_para'] ?? 'osviscondes@gmail.com';
    if (!$para) return;
    $host = preg_replace('/[^a-z0-9.-]/i', '', $_SERVER['HTTP_HOST'] ?? 'osviscondes.com');
    $host = preg_replace('/^www\./i', '', $host) ?: 'osviscondes.com';

    $cabecalhos = [
        'From: Site Os Viscondes <site@' . $host . '>',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: osviscondes',
    ];
    // Se deixou email, "Responder" no Gmail vai direto para a pessoa.
    $email = filter_var($resposta, FILTER_VALIDATE_EMAIL);
    if ($email) $cabecalhos[] = 'Reply-To: ' . $email;

    $corpo = "Nova mensagem pelo site osviscondes.com\n\n"
        . "Nome: $nome\nResposta para: $resposta\nAssunto: $assunto\n\n"
        . $texto . "\n\n--\nTambém está guardada na gestão do site: https://$host/#/gestao/envios\n";
    $titulo = mb_encode_mimeheader("[Site] $assunto: $nome", 'UTF-8', 'B', "\r\n");
    if (!@mail($para, $titulo, $corpo, implode("\r\n", $cabecalhos))) {
        error_log('osviscondes mensagens: o aviso por email falhou');
    }
}
