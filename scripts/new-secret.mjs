// Gera um SESSION_SECRET aleatório para colar nas variáveis de ambiente do Netlify.
import { randomBytes } from "node:crypto";
console.log(randomBytes(48).toString("base64url"));
