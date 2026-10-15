# Os Viscondes — site

Site d'Os Viscondes (Salreu, desde 2007), alojado no **Netlify** (plano gratuito).

O site tem quatro secções:

- **Início**
- **Carnaval**: um bloco por ano
- **Eventos**: Comedy Session, Cocoloto, BikeTour, Passeio TT e Sunset
- **Cocoloto**: a gestão do sorteio, só acessível com utilizador e palavra-passe. Inclui o modo **ecrã grande** para TV/monitor de 75".

Tecnologia:
- O site é feito em React (Vite).
- A parte do Cocoloto usa *Netlify Functions* (pasta `netlify/functions`).
- Os dados ficam no *Netlify Blobs*, a base de dados incluída no Netlify.

---

## 1. Publicar no Netlify (primeira vez)

1. Crie conta em <https://app.netlify.com> com o GitHub.
2. Escolha **Add new site → Import an existing project → GitHub** e selecione o repositório **Toze**.
3. As definições são lidas do `netlify.toml`, por isso não é preciso mudar nada. Carregue em **Deploy**.
4. **Variáveis de ambiente** (*Site configuration → Environment variables*). Crie duas:

   | Nome | Valor |
   |---|---|
   | `COCOLOTO_USERS` | `viscondes:HASH`. Para mais utilizadores, separe com vírgulas: `ana:HASH1,rui:HASH2` |
   | `SESSION_SECRET` | um texto aleatório com pelo menos 32 caracteres |

   Os valores geram-se no computador (precisa do [Node.js](https://nodejs.org)):

   ```bash
   npm install
   npm run hash-password -- "a-palavra-passe"   # dá o HASH
   npm run new-secret                           # dá o SESSION_SECRET
   ```

   Depois de as criar, faça **Deploys → Trigger deploy** para as funções as usarem.
5. **Domínio:** em *Domain management → Add a domain*, escreva `osviscondes.com` e siga as
   instruções. Há duas formas de ligar o domínio:
   - mudar os *nameservers* no sítio onde o domínio está registado para os do Netlify;
   - ou criar os registos DNS que o Netlify indicar.

   O certificado HTTPS é criado automaticamente.

Depois disto, cada alteração enviada para o branch principal (`main`) no GitHub é publicada sozinha.

## 2. Trazer os dados antigos da Hostinger (opcional)

1. No phpMyAdmin da Hostinger, selecione a tabela `rifas` e use **Exportar → formato JSON**.
2. No site novo, entre no **Cocoloto**.
3. Abra **Preparar um novo sorteio → Escolher ficheiro JSON…** e escolha o ficheiro.

## 3. Alterar textos e imagens

| O quê | Ficheiro |
|---|---|
| Anos do Carnaval (texto, tema, imagens) | `src/content/carnaval.js` |
| Eventos (texto, data, local) | `src/content/eventos.js` |
| Prémios do Cocoloto | `src/content/premios.js` |
| Imagens | pasta `src/assets/` |

Pode editar estes ficheiros diretamente no GitHub, com o lápis em cima do ficheiro.
Ao gravar no `main`, o Netlify publica a alteração.

## 4. Segurança do Cocoloto

- Sem sessão iniciada, nada é lido nem alterado.
- As palavras-passe nunca ficam no código. Só o hash fica guardado, nas variáveis do Netlify.
- A sessão expira ao fim de 8 horas. O cookie é assinado e não pode ser lido por JavaScript.
- Depois de 5 tentativas de login erradas, o login fica bloqueado 15 minutos.
- Pedidos vindos de outros sites são recusados.
- Para tirar o acesso a alguém, apague a pessoa de `COCOLOTO_USERS` e faça um novo deploy.

## 5. Ecrã grande (monitor/TV de 75")

Na grelha, carregue em **⛶ Ecrã grande**:
- O browser passa a ecrã inteiro.
- A matriz toda (25 linhas × 40–80 colunas) ajusta-se ao ecrã, sem scroll, com os números o maior possível.
- Os vencedores aparecem a piscar com a cor do prémio.

Para sair, use **Esc**.

## 6. Desenvolvimento local

```bash
npm install
cp .env.example .env      # e preencha com um hash e um segredo de teste
npm run dev:api           # funções + base de dados local em http://localhost:8888/api
npm run dev               # site em http://localhost:5173
```

`npm run build` gera a pasta `dist/`.
`npm run dev:api -- --dist` serve o site compilado em <http://localhost:8888>.

## Custos

- O plano gratuito do Netlify chega para este site. Cada publicação gasta créditos; ver
  <https://www.netlify.com/pricing/>.
- Se os créditos do mês acabarem, o site fica em pausa até ao mês seguinte.
- O domínio `osviscondes.com` paga-se à parte, todos os anos, onde estiver registado.
