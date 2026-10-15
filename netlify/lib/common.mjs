// Código comum às funções do Cocoloto: respostas JSON, sessão, base de dados (Netlify Blobs).
import { createHmac, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

export const TOTAL_RIFAS = 2000; // números 1..2000 (até 25 linhas x 80 colunas)
const SESSION_COOKIE = "osv_session";
const SESSION_HOURS = 8;

// ---------- Respostas ----------
export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export const fail = (error, status = 400) => json({ success: false, error }, status);

// Pedidos que alteram dados: só POST e só vindos da nossa própria app.
// (o cabeçalho X-Requested-With não pode ser enviado por formulários de outros sites)
export function checkPost(req) {
  if (req.method !== "POST") return fail("Método não permitido.", 405);
  if (req.headers.get("x-requested-with") !== "osviscondes") return fail("Pedido inválido.", 403);
  return null;
}

export async function readBody(req) {
  try {
    const data = await req.json();
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

// ---------- Configuração (variáveis de ambiente no painel do Netlify) ----------
// COCOLOTO_USERS  = "utilizador:hash" (vários separados por vírgula ou linha)
// SESSION_SECRET  = texto aleatório comprido
export function getUsers() {
  const raw = process.env.COCOLOTO_USERS || "";
  const users = {};
  for (const part of raw.split(/[,\n]/)) {
    const i = part.indexOf(":");
    if (i > 0) users[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return users;
}

function secret() {
  const s = process.env.SESSION_SECRET || "";
  if (s.length < 32) throw new Error("SESSION_SECRET em falta ou curto (mínimo 32 caracteres).");
  return s;
}

// ---------- Sessão (cookie assinado com HMAC) ----------
const sign = (payload) => createHmac("sha256", secret()).update(payload).digest("base64url");

export function sessionCookie(user) {
  const exp = Date.now() + SESSION_HOURS * 3600 * 1000;
  const payload = Buffer.from(JSON.stringify({ u: user, exp })).toString("base64url");
  const token = `${payload}.${sign(payload)}`;
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`;
}

export const clearCookie = () =>
  `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export function getSessionUser(req) {
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  if (!m) return null;
  const [payload, sig] = m[1].split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { u, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (!u || Date.now() > exp) return null;
    // o utilizador tem de continuar a existir (apagá-lo das variáveis termina a sessão)
    return getUsers()[u] ? u : null;
  } catch {
    return null;
  }
}

export function requireLogin(req) {
  return getSessionUser(req) ? null : fail("Sessão expirada. Entre novamente.", 401);
}

// ---------- Base de dados: Netlify Blobs ----------
export const store = (name = "cocoloto") => getStore({ name, consistency: "strong" });
const KEY = "rifas";

function emptyRifas() {
  return Array.from({ length: TOTAL_RIFAS }, (_, i) => ({
    id: i + 1,
    position: "0",
    seller: "",
    buyer: "",
    ranking: 0,
  }));
}

export async function loadRifas() {
  const res = await store().getWithMetadata(KEY, { type: "json" });
  return res
    ? { rifas: res.data, etag: res.etag, exists: true }
    : { rifas: emptyRifas(), etag: null, exists: false };
}

// Lê, altera e grava com controlo de concorrência (se alguém gravou entretanto, repete).
export async function updateRifas(mutate) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { rifas, etag, exists } = await loadRifas();
    const result = mutate(rifas);
    if (result && result.error) return result;
    // etag: só grava se ninguém alterou entretanto (sem etag disponível, grava diretamente)
    const opts = etag ? { onlyIfMatch: etag } : exists ? {} : { onlyIfNew: true };
    const w = await store().setJSON(KEY, rifas, opts);
    if (w.modified) return result || {};
  }
  return { error: "A base de dados está ocupada. Tente outra vez.", status: 409 };
}

export const POSITION_RE = /^[A-Z]{1,2}[1-9][0-9]{0,2}$/;
