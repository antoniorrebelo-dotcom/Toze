import { createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import { checkPost, fail, getUsers, json, readBody, sessionCookie, store } from "../lib/common.mjs";

// Limite: 5 falhas em 15 minutos por endereço IP
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const DUMMY_HASH = bcrypt.hashSync("utilizador-inexistente", 10);

export default async (req, context) => {
  const bad = checkPost(req);
  if (bad) return bad;

  const ip = context?.ip || req.headers.get("x-nf-client-connection-ip") || "unknown";
  const key = "login-" + createHash("sha256").update(ip).digest("hex").slice(0, 32);
  const attempts = store("cocoloto-login");
  let state = (await attempts.get(key, { type: "json" })) || null;
  if (!state || Date.now() - state.since > WINDOW_MS) state = { fails: 0, since: Date.now() };
  if (state.fails >= MAX_FAILS) {
    const wait = Math.ceil((WINDOW_MS - (Date.now() - state.since)) / 60000);
    return fail(`Demasiadas tentativas. Tente daqui a ${wait} min.`, 429);
  }

  const { username = "", password = "" } = await readBody(req);
  const users = getUsers();
  const name = String(username).trim();
  const hash = users[name];
  // compara sempre com um hash, mesmo que o utilizador não exista
  const ok = bcrypt.compareSync(String(password), hash || DUMMY_HASH) && !!hash && name !== "";

  if (!ok) {
    state.fails++;
    await attempts.setJSON(key, state);
    return fail("Utilizador ou palavra-passe incorretos.", 401);
  }

  await attempts.delete(key);
  return json({ success: true, user: name }, 200, { "Set-Cookie": sessionCookie(name) });
};

export const config = { path: "/api/login" };
