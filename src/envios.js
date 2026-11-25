// Ligação ao servidor para as fotos e vídeos enviados pelo público (api/enviar, api/envios, ...).
// Na pré-visualização (compilada com VITE_DEMO=1) não há servidor: simula as respostas.
import { apiFetch } from "./api";

const API_BASE = (import.meta.env.VITE_API_BASE || "/api").replace(/\/$/, "");
export const DEMO = import.meta.env.VITE_DEMO === "1";

export const urlFicheiro = (id) => `${API_BASE}/envio-ficheiro?id=${id}`;

// Fotos grandes são reduzidas no telemóvel antes de enviar (mais rápido e gasta menos dados).
// Se o browser não conseguir ler a foto (ex.: HEIC no Chrome), envia o original.
export async function prepararFoto(file) {
  if (!file.type.startsWith("image/") || file.size < 1.5 * 1024 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const k = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * k);
    canvas.height = Math.round(bmp.height * k);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((ok) => canvas.toBlob(ok, "image/jpeg", 0.88));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

// Envia um ficheiro; onProgresso recebe 0..1. Devolve { ok, error }.
export function enviarFicheiro(file, campos, onProgresso) {
  if (DEMO) {
    return new Promise((ok) => {
      let p = 0;
      const t = setInterval(() => {
        p += 0.25;
        onProgresso?.(Math.min(p, 1));
        if (p >= 1) {
          clearInterval(t);
          ok({ ok: true });
        }
      }, 250);
    });
  }
  return new Promise((ok) => {
    const fd = new FormData();
    Object.entries(campos).forEach(([k, v]) => fd.append(k, v));
    fd.append("ficheiro", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE}/enviar`);
    xhr.setRequestHeader("X-Requested-With", "osviscondes");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgresso?.(e.loaded / e.total);
    xhr.onload = () => {
      let j = {};
      try {
        j = JSON.parse(xhr.responseText);
      } catch {
        /* resposta inválida */
      }
      if (xhr.status === 413) j.error = j.error || "O ficheiro é grande demais.";
      ok(xhr.status === 200 && j.success ? { ok: true } : { ok: false, error: j.error || "O envio falhou. Tente outra vez." });
    };
    xhr.onerror = () => ok({ ok: false, error: "Sem ligação. Verifique a internet e tente outra vez." });
    xhr.send(fd);
  });
}

// Fotos e vídeos do público já aprovados para uma galeria.
export async function envioPublicos(destino) {
  if (DEMO) return [];
  try {
    const r = await fetch(`${API_BASE}/galeria-publico?destino=${encodeURIComponent(destino)}`);
    if (!r.ok) return [];
    const j = await r.json();
    return Array.isArray(j) ? j : [];
  } catch {
    return [];
  }
}

// ---- gestão (com sessão iniciada) ----
export async function listarEnvios(estado) {
  if (DEMO) return demoLista(estado);
  const r = await apiFetch(`envios?estado=${estado}`);
  if (!r.ok) throw new Error("Não foi possível carregar os envios.");
  return r.json();
}

export async function alterarEnvio(id, acao, destino) {
  if (DEMO) return demoAlterar(id, acao, destino);
  const r = await apiFetch("envio-estado", {
    method: "POST",
    body: JSON.stringify(destino ? { id, acao, destino } : { id, acao }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.success) throw new Error(j.error || "Não foi possível guardar.");
}

// ---- dados de exemplo para a pré-visualização ----
let demo = null;
async function demoDados() {
  if (demo) return demo;
  const fotos = Object.values(
    import.meta.glob("./assets/carnaval-2018-z-1*.jpg", { eager: true, import: "default", query: "?url" })
  ).slice(0, 4);
  demo = fotos.map((url, i) => ({
    id: i + 1,
    destino: ["carnaval-2018", "carnaval-2018", "carnaval-2017", "carnaval-2018"][i],
    tipo: "foto",
    tamanho: 480000 + i * 91000,
    nome: ["Maria S.", "", "Zé da Esquina", "Ana"][i],
    contacto: ["", "", "912 000 000", "ana@exemplo.pt"][i],
    criado_em: `2026-11-2${i} 21:1${i}:00`,
    url,
    estado: "pendente",
  }));
  return demo;
}
async function demoLista(estado) {
  const d = await demoDados();
  return { envios: d.filter((e) => e.estado === estado), pendentes: d.filter((e) => e.estado === "pendente").length };
}
async function demoAlterar(id, acao, destino) {
  const d = await demoDados();
  const e = d.find((x) => x.id === id);
  if (!e) return;
  if (acao === "apagar") demo = d.filter((x) => x.id !== id);
  if (acao === "aprovar") e.estado = "aprovado";
  if (acao === "pendente") e.estado = "pendente";
  if (destino) e.destino = destino;
}
