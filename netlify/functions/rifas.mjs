// Devolve todas as rifas (só com sessão iniciada).
import { json, loadRifas, requireLogin } from "../lib/common.mjs";

export default async (req) => {
  const denied = requireLogin(req);
  if (denied) return denied;
  const { rifas } = await loadRifas();
  return json(rifas);
};

export const config = { path: "/api/rifas" };
