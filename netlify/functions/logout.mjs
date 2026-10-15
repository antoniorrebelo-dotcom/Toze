import { checkPost, clearCookie, json } from "../lib/common.mjs";

export default async (req) => {
  const bad = checkPost(req);
  if (bad) return bad;
  return json({ success: true }, 200, { "Set-Cookie": clearCookie() });
};

export const config = { path: "/api/logout" };
