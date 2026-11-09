# Como mudar o site d'Os Viscondes

Este guia é para quem não é programador. Tudo se faz no browser, no GitHub. Não é
preciso instalar nada.

## Como funciona

1. Os textos e as imagens estão guardados no GitHub, no repositório **Toze**.
2. Quando grava uma alteração no GitHub, o site é **atualizado sozinho na Hostinger**
   em 1 a 3 minutos. Isto só funciona depois de configurar a ligação, no fim deste guia.
3. Se algo correr mal, o site antigo continua no ar. Nada se estraga.

## Antes de começar

1. Entre em <https://github.com/antoniorrebelo-dotcom/Toze>.
2. Por cima da lista de ficheiros, escolha o branch onde o site está.
   Neste momento é **`site-netlify`**.

## Mudar um texto

Os textos estão todos na pasta **`src/content/`**:

| Quero mudar…                         | Ficheiro                    |
|--------------------------------------|-----------------------------|
| História do grupo e frase do início  | `src/content/grupo.js`      |
| Carnaval: Corsos, Marchas, lugares   | `src/content/carnaval.js`   |
| Os eventos (texto, data, local)      | `src/content/eventos.js`    |
| As regras do Cocoloto                | `src/content/regras.js`     |
| Os prémios do Cocoloto               | `src/content/premios.js`    |
| Facebook, Instagram, email           | `src/content/contactos.js`  |

Passo a passo:

1. Abra o ficheiro (por exemplo `src/content/premios.js`).
2. Carregue no **lápis ✏️** no canto superior direito.
3. Mude **só o texto entre aspas**. Por exemplo:
   ```js
   { name: "Leitão assado", color: "#9c5618" },
   ```
   passa a
   ```js
   { name: "Presunto inteiro", color: "#9c5618" },
   ```
4. Carregue em **Commit changes…**, escreva o que mudou (ex.: "Prémios 2027") e confirme.

### Cuidados para não estragar nada

- Mude só o que está **entre aspas** `"…"`.
- Não apague vírgulas, chavetas `{ }` nem parênteses retos `[ ]`.
- Para escrever aspas dentro de um texto, use as aspas curvas “assim”.
- Se a publicação falhar, o GitHub manda um email e o site antigo continua no ar.
  Veja o erro em **Actions**, ou peça ajuda.

## Acrescentar um ano de Carnaval

1. **Envie a imagem:**
   - Entre na pasta `src/assets/` e escolha **Add file → Upload files**.
   - Use um nome simples, sem espaços nem acentos, por exemplo `carnaval-2027-tema.png`.
   - Carregue em **Commit changes**.
2. **Abra `src/content/carnaval.js`** com o lápis.
3. **Lá em cima**, junto às outras linhas `import`, acrescente:
   ```js
   import Tema2027 from "../assets/carnaval-2027-tema.png";
   ```
4. **Logo a seguir a `export const CARNAVAL = [`**, cole um bloco novo. O mais recente fica primeiro.
   ```js
     {
       year: 2027,
       corso: { tema: "Nome do tema do Corso", lugar: 1 },
       marcha: { tema: "Nome da Marcha Luminosa", lugar: null },
       publico: false,
       text: "Um pequeno texto sobre o desfile deste ano.",
       images: [{ src: Tema2027, alt: "Logótipo do tema 2027" }],
       accent: "#5b2a75",
     },
   ```
   - `lugar`: a classificação (`1`, `2`, `3`…). Use `null` se não houver.
   - `publico`: `true` se ganharam o Prémio do Público nesse ano, `false` se não.
   - `text` e `images` são opcionais. Sem imagem, ponha `images: [],` e salte os passos 1 e 3.
   - `accent` é a cor do ano, no formato `#rrggbb`.
   - O resumo das vitórias no topo da página atualiza-se sozinho.

**Só saiu a classificação mais tarde?** Mude apenas o `lugar` desse ano, por exemplo de `null` para `1`.

## Mudar a data e o local de um evento

Em `src/content/eventos.js`, cada evento tem:

```js
when: "",       // ex.: "14 de junho de 2027"
where: "",      // ex.: "Largo de Salreu"
```

Escreva entre as aspas. Se ficar vazio, não aparece no site.

## Pôr o vídeo das regras

1. Envie o vídeo (`.mp4`) para a pasta `public/`, por exemplo `public/regras-cocoloto.mp4`.
2. Em `src/content/regras.js`, mude `video: null,` para
   ```js
   video: "/regras-cocoloto.mp4",
   ```

Vídeos grandes tornam o site lento. Tente que o vídeo tenha menos de 30 MB.

## Mudar a palavra-passe do Cocoloto

A palavra-passe não está no GitHub. Está no ficheiro `api/config.php` na Hostinger.

1. Gere o "hash" da palavra-passe nova. Quem tiver o projeto no computador corre
   `npm run hash-password -- "nova-palavra-passe"`. Também pode pedir ao Claude.
2. No hPanel → **Gestor de Ficheiros** → `public_html/api/config.php`, abra para editar.
3. Na linha `'viscondes' => '...'`, troque o texto entre as segundas aspas pelo hash novo e grave.

---

## Ligar a publicação automática (fazer uma vez)

Sem este passo, as alterações ficam no GitHub, mas não chegam ao site.

1. **Dados de FTP da Hostinger**: no hPanel → **Ficheiros → Contas FTP**, anote:
   - o **Servidor FTP** (ex.: `ftp.osviscondes.com`, ou um IP);
   - o **Utilizador FTP** (ex.: `u726147567.osviscondes.com`);
   - a **Palavra-passe**. Se não souber, pode redefini-la aí.
2. **Guardar no GitHub**, em <https://github.com/antoniorrebelo-dotcom/Toze> →
   **Settings → Secrets and variables → Actions → New repository secret**. Crie três:
   - `FTP_SERVER`: o servidor
   - `FTP_USERNAME`: o utilizador
   - `FTP_PASSWORD`: a palavra-passe
3. **Testar**: em **Actions → Publicar na Hostinger → Run workflow**.
   Ao fim de 1 a 3 minutos fica um ✅ verde e o site está atualizado.

O ficheiro `api/config.php` (base de dados e login do Cocoloto) **nunca é enviado nem apagado**
pela publicação automática. Fica sempre o que está na Hostinger.

### Sem FTP: publicar à mão

Cada alteração também gera um ZIP:

1. Abra **Actions** e escolha a última execução de "Publicar na Hostinger".
2. Em **Artifacts**, descarregue **osviscondes-hostinger**.
3. No Gestor de Ficheiros da Hostinger, extraia-o dentro do `public_html`, substituindo os ficheiros.
   **Atenção:** este ZIP não traz o `api/config.php`, e isso é de propósito. Não apague o que já lá está.
