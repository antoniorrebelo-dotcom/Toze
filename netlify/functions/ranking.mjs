// Marca um número como 1.º, 2.º ou 3.º prémio: { id, ranking }
import { TOTAL_RIFAS, checkPost, fail, json, readBody, requireLogin, updateRifas } from "../lib/common.mjs";

export default async (req) => {
  const bad = checkPost(req) || requireLogin(req);
  if (bad) return bad;

  const body = await readBody(req);
  const id = Number(body.id);
  const ranking = Number(body.ranking);
  if (!Number.isInteger(id) || id < 1 || id > TOTAL_RIFAS || ![1, 2, 3].includes(ranking)) {
    return fail("Parâmetros inválidos.");
  }

  const result = await updateRifas((rifas) => {
    for (const r of rifas) if (r.ranking === ranking && r.id !== id) r.ranking = 0;
    rifas.find((r) => r.id === id).ranking = ranking;
  });
  if (result.error) return fail(result.error, result.status || 500);
  return json({ success: true, id, ranking });
};

export const config = { path: "/api/ranking" };
