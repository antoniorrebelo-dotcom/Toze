<?php
// ============================================================
//  CONFIGURAÇÃO — copie este ficheiro para "config.php" e preencha.
//  O config.php NUNCA deve ser partilhado (tem as palavras-passe).
// ============================================================
return [
    // Base de dados MySQL / MariaDB (dados do painel do alojamento)
    'db' => [
        'host'     => 'localhost',
        'name'     => 'NOME_DA_BASE_DE_DADOS',
        'user'     => 'UTILIZADOR_DA_BASE_DE_DADOS',
        'password' => 'PALAVRA_PASSE_DA_BASE_DE_DADOS',
        'charset'  => 'utf8mb4',
    ],

    // Utilizadores com acesso à gestão do Cocoloto.
    // Não escreva a palavra-passe aqui! Escreva o "hash", gerado com:
    //     npm run hash-password -- "a-palavra-passe"
    // ou, num servidor com PHP:
    //     php -r 'echo password_hash("a-palavra-passe", PASSWORD_DEFAULT), PHP_EOL;'
    'users' => [
        // 'utilizador' => '$2y$12$....',
    ],

    // Tempo máximo de uma sessão sem atividade (segundos). 8 horas.
    'session_lifetime' => 8 * 3600,

    // Email que recebe o aviso de cada mensagem do formulário da página Contactos.
    // (As mensagens ficam também guardadas na gestão: osviscondes.com/#/gestao/envios)
    'mensagens_para' => 'osviscondes@gmail.com',

    // Pasta onde ficam as fotos e vídeos enviados pelo público (opcional).
    // Por omissão é uma pasta "osviscondes-envios" ao lado do public_html, fora do site público.
    // 'envios_dir' => '/home/UTILIZADOR/domains/osviscondes.com/osviscondes-envios',
];
