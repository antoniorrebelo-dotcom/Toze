// Servidor local para testar as funções do Netlify sem conta Netlify.
//   npm run dev:api            -> API em http://localhost:8888/api (use com "npm run dev")
//   npm run dev:api -- --dist  -> serve também a pasta dist/ (site compilado)
// Lê COCOLOTO_USERS e SESSION_SECRET do ficheiro .env (ver .env.example).
import { createServer } from "node:http";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { setEnvironmentContext } from "@netlify/blobs";
import { BlobsServer } from "@netlify/blobs/server";

const ROOT = resolve(import.meta.dirname, "..");
const PORT = Number(process.env.PORT || 8888);
const serveDist = process.argv.includes("--dist");

// .env
const envFile = join(ROOT, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
  }
}

// Netlify Blobs local (guardado em .netlify/blobs-local)
const blobs = new BlobsServer({ directory: join(ROOT, ".netlify/blobs-local"), token: "dev" });
const { port: blobsPort } = await blobs.start();
const blobsURL = `http://localhost:${blobsPort}`;
setEnvironmentContext({ siteID: "local", token: "dev", edgeURL: blobsURL, uncachedEdgeURL: blobsURL });

// Carrega as funções e as respetivas rotas
const routes = new Map();
const fnDir = join(ROOT, "netlify/functions");
for (const f of readdirSync(fnDir).filter((f) => f.endsWith(".mjs"))) {
  const mod = await import(pathToFileURL(join(fnDir, f)).href);
  for (const p of [].concat(mod.config.path)) routes.set(p, mod.default);
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".ico": "image/x-icon", ".svg": "image/svg+xml" };

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const handler = routes.get(url.pathname);
  if (handler) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
    });
    try {
      const r = await handler(request, { ip: req.socket.remoteAddress });
      res.writeHead(r.status, Object.fromEntries(r.headers));
      res.end(Buffer.from(await r.arrayBuffer()));
    } catch (e) {
      console.error(e);
      res.writeHead(500).end("erro");
    }
    return;
  }
  if (serveDist) {
    let file = join(ROOT, "dist", url.pathname === "/" ? "index.html" : url.pathname);
    if (!file.startsWith(join(ROOT, "dist")) || !existsSync(file) || statSync(file).isDirectory()) {
      file = join(ROOT, "dist/index.html");
    }
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
    return;
  }
  res.writeHead(404).end();
}).listen(PORT, () => console.log(`API local em http://localhost:${PORT}/api`));
