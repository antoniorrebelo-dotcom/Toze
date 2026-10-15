// Importa os dados antigos (exportação JSON da tabela "rifas" no phpMyAdmin).
// Aceita a exportação completa do phpMyAdmin ou uma lista simples [{id, position, ranking}].
import { POSITION_RE, TOTAL_RIFAS, checkPost, fail, json, readBody, requireLogin, updateRifas } from "../lib/common.mjs";

function findRows(data) {
  if (Array.isArray(data)) {
    const table = data.find((x) => x && x.type === "table" && Array.isArray(x.data));
    if (table) return table.data;
    if (data.every((x) => x && "id" in x)) return data;
  }
  if (data && Array.isArray(data.rows)) return data.rows;
  return null;
}

export default async (req) => {
  const bad = checkPost(req) || requireLogin(req);
  if (bad) return bad;

  const rows = findRows(await readBody(req));
  if (!rows) return fail("Ficheiro não reconhecido. Exporte a tabela rifas em formato JSON.");

  const result = await updateRifas((rifas) => {
    const byId = new Map(rifas.map((r) => [r.id, r]));
    let n = 0;
    for (const row of rows) {
      const r = byId.get(Number(row.id));
      if (!r) continue;
      const pos = String(row.position ?? "0").trim().toUpperCase();
      r.position = pos === "0" || POSITION_RE.test(pos) ? pos : "0";
      r.ranking = [1, 2, 3].includes(Number(row.ranking)) ? Number(row.ranking) : 0;
      r.seller = String(row.seller ?? "").slice(0, 100);
      r.buyer = String(row.buyer ?? "").slice(0, 100);
      n++;
    }
    return { imported: n };
  });
  if (result.error) return fail(result.error, result.status || 500);
  return json({ success: true, imported: result.imported, total: TOTAL_RIFAS });
};

export const config = { path: "/api/import" };
