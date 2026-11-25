// Mensagens do formulário da página Contactos (api/mensagem, api/mensagens, api/mensagem-estado).
// Na pré-visualização (VITE_DEMO=1) não há servidor: simula as respostas.
import { apiFetch } from "./api";
import { DEMO } from "./envios";

export const ASSUNTOS = ["Convite", "Cocoloto", "Eventos", "Outro"];

export async function enviarMensagem(dados) {
  if (DEMO) {
    await new Promise((ok) => setTimeout(ok, 600));
    return { ok: true };
  }
  try {
    const r = await apiFetch("mensagem", { method: "POST", body: JSON.stringify(dados) });
    const j = await r.json().catch(() => ({}));
    return r.ok && j.success ? { ok: true } : { ok: false, error: j.error || "Não foi possível enviar. Tente outra vez." };
  } catch {
    return { ok: false, error: "Sem ligação. Verifique a internet e tente outra vez." };
  }
}

// ---- gestão ----
export async function listarMensagens() {
  if (DEMO) return { mensagens: demo.filter((m) => !m.apagada), porLer: demo.filter((m) => !m.lida && !m.apagada).length };
  const r = await apiFetch("mensagens");
  if (!r.ok) throw new Error("Não foi possível carregar as mensagens.");
  return r.json();
}

export async function alterarMensagem(id, acao) {
  if (DEMO) {
    const m = demo.find((x) => x.id === id);
    if (m) {
      if (acao === "apagar") m.apagada = true;
      else m.lida = acao === "lida";
    }
    return;
  }
  const r = await apiFetch("mensagem-estado", { method: "POST", body: JSON.stringify({ id, acao }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.success) throw new Error(j.error || "Não foi possível guardar.");
}

const demo = [
  {
    id: 2,
    nome: "Junta de Freguesia",
    resposta: "junta@exemplo.pt",
    assunto: "Convite",
    texto: "Boa tarde! Gostávamos de convidar Os Viscondes para animar a festa de verão em julho. Têm disponibilidade?",
    lida: false,
    criado_em: "2026-11-24 18:02:00",
  },
  {
    id: 1,
    nome: "Carla",
    resposta: "912 000 000",
    assunto: "Cocoloto",
    texto: "Onde posso comprar rifas para o próximo Cocoloto?",
    lida: true,
    criado_em: "2026-11-20 10:15:00",
  },
];
