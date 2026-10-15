// Grava as posições na grelha: { updates: [{ id, position }, ...] }
// "0" = sem posição. Quem estiver na posição pedida perde-a.
import { POSITION_RE, TOTAL_RIFAS, checkPost, fail, json, readBody, requireLogin, updateRifas } from "../lib/common.mjs";

export default async (req) => {
  const bad = checkPost(req) || requireLogin(req);
  if (bad) return bad;

  const { updates } = await readBody(req);
  if (!Array.isArray(updates) || updates.length === 0 || updates.length > TOTAL_RIFAS) {
    return fail("Nada para gravar.");
  }
  const clean = [];
  for (const u of updates) {
    const id = Number(u?.id);
    const position = String(u?.position ?? "").trim().toUpperCase();
    if (!Number.isInteger(id) || id < 1 || id > TOTAL_RIFAS) return fail(`Número inválido: ${u?.id}`);
    if (position !== "0" && !POSITION_RE.test(position)) return fail(`Posição inválida: ${position}`);
    clean.push({ id, position });
  }

  const result = await updateRifas((rifas) => {
    const byId = new Map(rifas.map((r) => [r.id, r]));
    for (const { id, position } of clean) {
      if (position !== "0") {
        for (const r of rifas) if (r.position === position && r.id !== id) r.position = "0";
      }
      byId.get(id).position = position;
    }
    return { saved: clean.length };
  });
  if (result.error) return fail(result.error, result.status || 500);
  return json({ success: true, saved: result.saved });
};

export const config = { path: "/api/positions" };
