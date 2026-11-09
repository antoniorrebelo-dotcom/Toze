// Gera a pasta dist-hostinger/ pronta a enviar para o public_html da Hostinger:
// site compilado + api/ em PHP + .htaccess. Inclui api/config.php se existir.
import { execSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "dist-hostinger");

rmSync(OUT, { recursive: true, force: true });
execSync(`npx vite build --outDir "${OUT}"`, { cwd: ROOT, stdio: "inherit" });
cpSync(join(ROOT, "hostinger/.htaccess"), join(OUT, ".htaccess"));
cpSync(join(ROOT, "hostinger/api"), join(OUT, "api"), { recursive: true });

if (existsSync(join(ROOT, "hostinger/api/config.php"))) {
  console.log("\n✓ dist-hostinger/ pronto (com api/config.php).");
} else {
  console.log("\n⚠ Falta hostinger/api/config.php (copie de config.example.php e preencha).");
}
