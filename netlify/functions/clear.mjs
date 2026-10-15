// Preparar um novo sorteio: limpa as posições ou os vencedores.
import { checkPost, json, requireLogin, updateRifas } from "../lib/common.mjs";

export default async (req) => {
  const bad = checkPost(req) || requireLogin(req);
  if (bad) return bad;

  const what = new URL(req.url).pathname.endsWith("clear-ranking") ? "ranking" : "position";
  const result = await updateRifas((rifas) => {
    for (const r of rifas) r[what] = what === "ranking" ? 0 : "0";
    return { rowsAffected: rifas.length };
  });
  if (result.error) return json({ success: false, error: result.error }, result.status || 500);
  return json({ success: true, rowsAffected: result.rowsAffected });
};

export const config = { path: ["/api/clear-positions", "/api/clear-ranking"] };
