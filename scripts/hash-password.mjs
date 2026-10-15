// Gera o "hash" de uma palavra-passe para a variável COCOLOTO_USERS do Netlify
// Uso:  npm run hash-password -- "a-minha-palavra-passe"
import bcrypt from "bcryptjs";

const pw = process.argv[2];
if (!pw) {
  console.error('Uso: npm run hash-password -- "a-minha-palavra-passe"');
  process.exit(1);
}
if (pw.length < 10) {
  console.error("Aviso: use pelo menos 10 caracteres.");
}
console.log(bcrypt.hashSync(pw, 12));
