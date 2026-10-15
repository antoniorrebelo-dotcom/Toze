import { getSessionUser, json } from "../lib/common.mjs";

export default async (req) => {
  const user = getSessionUser(req);
  return json({ authenticated: !!user, user });
};

export const config = { path: "/api/session" };
