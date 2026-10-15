// Pequeno "fetch" para as funções do servidor (Netlify Functions em /api).
// - envia o cookie de sessão
// - envia um cabeçalho próprio (proteção CSRF: browsers de outros sites não o conseguem enviar)
// - se a sessão expirou (401), avisa a app para voltar a mostrar o login
const API_BASE = (import.meta.env.VITE_API_BASE || "/api").replace(/\/$/, "");

export async function apiFetch(path, options = {}) {
  const resp = await fetch(`${API_BASE}/${path}`, {
    ...options,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "osviscondes",
      ...(options.headers || {}),
    },
  });
  if (resp.status === 401) {
    window.dispatchEvent(new Event("auth:expired"));
  }
  return resp;
}
