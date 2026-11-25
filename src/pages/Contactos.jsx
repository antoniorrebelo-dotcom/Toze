import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DESTINOS } from "../content/destinos";
import { DEMO, enviarFicheiro, prepararFoto } from "../envios";
import { CONTACTOS } from "../content/contactos";
import { ASSUNTOS, enviarMensagem } from "../mensagens";

const VIDEO_MAX = 300 * 1024 * 1024;
const mb = (n) => (n / 1024 / 1024).toFixed(n < 10 * 1024 * 1024 ? 1 : 0) + " MB";

// /contactos — contactos do grupo, formulário de mensagem e envio de fotos e vídeos pelo público
// (as mensagens e as fotos ficam na gestão; as fotos só aparecem no site depois de aprovadas).
export default function Contactos() {
  const [params] = useSearchParams();
  // vindo de uma galeria ("Enviar as minhas fotos"), salta logo para o formulário
  useEffect(() => {
    if (params.get("para") || params.get("fotos") !== null) {
      document.getElementById("enviar-fotos")?.scrollIntoView({ block: "start" });
    }
  }, [params]);
  return (
    <>
      <section className="container section contactos">
        <h1 className="titulo-pagina">Contactos</h1>
        <p className="papel">
          Quer falar com Os Viscondes, convidar o grupo para alguma coisa ou saber mais sobre o Cocoloto e os
          eventos? Escreva-nos ou fale connosco nas redes sociais.
        </p>
        <ul className="contactos-lista">
          <li>
            <a href="#mensagem" onClick={irPara("mensagem")} style={{ "--c": "var(--laranja)" }}>
              <span className="contactos-rotulo">Mensagem</span>
              <span className="contactos-valor">Escreva-nos aqui mesmo, no site</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACTOS.email}`} style={{ "--c": "var(--papel)" }}>
              <span className="contactos-rotulo">Email</span>
              <span className="contactos-valor">{CONTACTOS.email}</span>
            </a>
          </li>
          <li>
            <a href={CONTACTOS.facebook} target="_blank" rel="noopener noreferrer" style={{ "--c": "var(--papel)" }}>
              <span className="contactos-rotulo">Facebook</span>
              <span className="contactos-valor">Os Viscondes de Salreu</span>
            </a>
          </li>
          <li>
            <a href={CONTACTOS.instagram} target="_blank" rel="noopener noreferrer" style={{ "--c": "var(--papel)" }}>
              <span className="contactos-rotulo">Instagram</span>
              <span className="contactos-valor">@osviscondesdesalreu</span>
            </a>
          </li>
        </ul>
        <p className="contactos-fotos">
          Tem fotos ou vídeos d'Os Viscondes?{" "}
          <a href="#enviar-fotos" onClick={irPara("enviar-fotos")}>
            Envie-as mais abaixo
          </a>
          .
        </p>
      </section>
      <FormMensagem />
      <FormEnvio params={params} />
    </>
  );
}

// Com o HashRouter, "#mensagem" mudaria de página: em vez disso, desliza até à secção.
const irPara = (id) => (e) => {
  e.preventDefault();
  const reduzido = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduzido ? "auto" : "smooth", block: "start" });
};

function FormMensagem() {
  const [nome, setNome] = useState("");
  const [resposta, setResposta] = useState("");
  const [assunto, setAssunto] = useState("");
  const [texto, setTexto] = useState("");
  const [armadilha, setArmadilha] = useState("");
  const [estado, setEstado] = useState(""); // "" | "a enviar" | "ok"
  const [erro, setErro] = useState("");
  useEffect(() => setErro(""), [nome, resposta, assunto, texto]);

  const enviar = async (e) => {
    e.preventDefault();
    const r = resposta.trim();
    if (!nome.trim()) return setErro("Falta o seu nome.");
    if (!/^\S+@\S+\.\S+$/.test(r) && !/^\+?[0-9 ()-]{9,20}$/.test(r)) {
      return setErro("Indique um email ou um telefone para lhe respondermos.");
    }
    if (!assunto) return setErro("Escolha o assunto.");
    if (texto.trim().length < 5) return setErro("Escreva a sua mensagem.");
    setErro("");
    setEstado("a enviar");
    const res = await enviarMensagem({ nome: nome.trim(), resposta: r, assunto, texto: texto.trim(), site: armadilha });
    if (res.ok) {
      setEstado("ok");
      setTexto("");
    } else {
      setEstado("");
      setErro(res.error);
    }
  };

  return (
    <section className="container section enviar mensagem" id="mensagem">
      <h2 className="titulo">Mandar mensagem</h2>
      {estado === "ok" ? (
        <div className="enviar-cartao">
          <p className="enviar-obrigado" role="status">
            Obrigado, {nome.trim().split(" ")[0]}! Recebemos a sua mensagem e respondemos assim que pudermos.
          </p>
          <button type="button" className="btn btn-ghost" onClick={() => setEstado("")}>
            Escrever outra mensagem
          </button>
        </div>
      ) : (
        <form className="enviar-cartao" onSubmit={enviar} noValidate>
          <div className="enviar-duas">
            <label>
              O seu nome
              <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={80} autoComplete="name" required />
            </label>
            <label>
              Email ou telefone <small>(para lhe respondermos)</small>
              <input value={resposta} onChange={(e) => setResposta(e.target.value)} maxLength={120} autoComplete="email" required />
            </label>
          </div>
          <fieldset className="mensagem-assuntos">
            <legend>Assunto</legend>
            {ASSUNTOS.map((a) => (
              <label key={a}>
                <input type="radio" name="assunto" value={a} checked={assunto === a} onChange={() => setAssunto(a)} />
                <span>{a}</span>
              </label>
            ))}
          </fieldset>
          <label>
            Mensagem
            <textarea value={texto} onChange={(e) => setTexto(e.target.value)} rows={6} maxLength={4000} required />
          </label>
          <input className="armadilha" tabIndex={-1} autoComplete="off" value={armadilha} onChange={(e) => setArmadilha(e.target.value)} aria-hidden="true" />
          {erro && (
            <p className="form-error" role="alert">
              {erro}
            </p>
          )}
          <button className="btn btn-lg" disabled={estado === "a enviar"}>
            {estado === "a enviar" ? "A enviar…" : "Enviar mensagem"}
          </button>
        </form>
      )}
    </section>
  );
}

function FormEnvio({ params }) {
  const inicial = DESTINOS.some((d) => d.codigo === params.get("para")) ? params.get("para") : "";
  const [destino, setDestino] = useState(inicial);
  const [nome, setNome] = useState("");
  const [contacto, setContacto] = useState("");
  const [autorizo, setAutorizo] = useState(false);
  const [armadilha, setArmadilha] = useState("");
  const [itens, setItens] = useState([]); // { file, estado: "fila"|"a enviar"|"ok"|"erro", progresso, erro }
  const [aEnviar, setAEnviar] = useState(false);
  const [erro, setErro] = useState("");

  const galeria = DESTINOS.find((d) => d.codigo === destino)?.galeria;
  const grupos = useMemo(() => ["Carnaval", "Eventos"].map((g) => [g, DESTINOS.filter((d) => d.grupo === g)]), []);
  const terminou = itens.length > 0 && itens.every((i) => i.estado === "ok" || i.estado === "erro") && !aEnviar;
  const enviados = itens.filter((i) => i.estado === "ok").length;

  const escolher = (lista) => {
    const novos = [...lista]
      .filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/") || /\.(heic|mov|mp4)$/i.test(f.name))
      .map((file) => ({
        file,
        estado: file.type.startsWith("video/") && file.size > VIDEO_MAX ? "erro" : "fila",
        progresso: 0,
        erro: file.type.startsWith("video/") && file.size > VIDEO_MAX ? "Vídeo grande demais (máx. 300 MB)." : "",
      }));
    setItens((v) => [...v.filter((i) => i.estado !== "ok"), ...novos]);
    setErro("");
  };

  const atualizar = (idx, mudanca) => setItens((v) => v.map((i, j) => (j === idx ? { ...i, ...mudanca } : i)));

  const enviar = async (e) => {
    e.preventDefault();
    if (!destino) return setErro("Escolha o Carnaval ou o evento.");
    if (!itens.some((i) => i.estado === "fila" || i.estado === "erro")) return setErro("Escolha pelo menos uma foto ou vídeo.");
    if (!autorizo) return setErro("Falta autorizar a publicação.");
    setErro("");
    setAEnviar(true);
    const campos = { destino, nome: nome.trim(), contacto: contacto.trim(), autorizo: "1", site: armadilha };
    for (let idx = 0; idx < itens.length; idx++) {
      const item = itens[idx];
      if (item.estado === "ok" || (item.estado === "erro" && item.file.size > VIDEO_MAX && item.file.type.startsWith("video/"))) continue;
      atualizar(idx, { estado: "a enviar", progresso: 0, erro: "" });
      const ficheiro = await prepararFoto(item.file);
      const r = await enviarFicheiro(ficheiro, campos, (p) => atualizar(idx, { progresso: p }));
      atualizar(idx, r.ok ? { estado: "ok", progresso: 1 } : { estado: "erro", erro: r.error });
    }
    setAEnviar(false);
  };

  return (
    <section className="container section enviar" id="enviar-fotos">
      <h2 className="titulo">Envie as suas fotos</h2>
      <p className="papel">
        Tem fotos ou vídeos d'Os Viscondes guardados no telemóvel? Ajude-nos a completar a história do grupo
        a caminho dos 20 anos. Tudo o que receber é visto pela organização antes de aparecer no site.
      </p>
      {DEMO && (
        <p className="enviar-demo">
          Pré-visualização: aqui o envio é só simulado. No site a sério, os ficheiros vão para a gestão.
        </p>
      )}

      <form className="enviar-cartao" onSubmit={enviar} noValidate>
        <label>
          De que Carnaval ou evento são?
          <select value={destino} onChange={(e) => setDestino(e.target.value)} required>
            <option value="">Escolher…</option>
            {grupos.map(([g, lista]) => (
              <optgroup key={g} label={g}>
                {lista.map((d) => (
                  <option key={d.codigo} value={d.codigo}>
                    {d.nome}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className="enviar-zona">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => {
              escolher(e.target.files);
              e.target.value = "";
            }}
          />
          <span className="enviar-zona-titulo">+ Escolher fotos e vídeos</span>
          <span>Pode escolher várias de uma vez. Vídeos até 300 MB.</span>
        </label>

        {itens.length > 0 && (
          <ul className="enviar-lista">
            {itens.map((i, idx) => (
              <li key={idx} className={"estado-" + i.estado.replace(" ", "-")}>
                <span className="enviar-nome">{i.file.name}</span>
                <span className="enviar-tamanho">{mb(i.file.size)}</span>
                <span className="enviar-estado">
                  {i.estado === "fila" && (
                    <button type="button" className="enviar-tirar" onClick={() => setItens((v) => v.filter((_, j) => j !== idx))}>
                      Tirar
                    </button>
                  )}
                  {i.estado === "a enviar" && `${Math.round(i.progresso * 100)}%`}
                  {i.estado === "ok" && "Enviado ✓"}
                  {i.estado === "erro" && i.erro}
                </span>
                {i.estado === "a enviar" && <span className="enviar-barra" style={{ width: `${i.progresso * 100}%` }} />}
              </li>
            ))}
          </ul>
        )}

        <div className="enviar-duas">
          <label>
            O seu nome <small>(opcional, aparece junto às fotos)</small>
            <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={80} autoComplete="name" />
          </label>
          <label>
            Contacto <small>(opcional, só para a organização)</small>
            <input value={contacto} onChange={(e) => setContacto(e.target.value)} maxLength={120} placeholder="Telefone ou email" />
          </label>
        </div>
        {/* armadilha para robôs: escondida das pessoas */}
        <input className="armadilha" tabIndex={-1} autoComplete="off" value={armadilha} onChange={(e) => setArmadilha(e.target.value)} aria-hidden="true" />

        <label className="enviar-check">
          <input type="checkbox" checked={autorizo} onChange={(e) => setAutorizo(e.target.checked)} />
          <span>
            As fotos e vídeos são meus ou tenho autorização de quem os fez, e autorizo Os Viscondes a publicá-los no site.
          </span>
        </label>

        {erro && (
          <p className="form-error" role="alert">
            {erro}
          </p>
        )}
        {terminou && enviados > 0 && (
          <p className="enviar-obrigado" role="status">
            Obrigado! {enviados === 1 ? "Recebemos 1 ficheiro" : `Recebemos ${enviados} ficheiros`}. Aparecem
            {galeria ? (
              <>
                {" "}
                na <Link to={galeria}>galeria</Link>
              </>
            ) : (
              " no site"
            )}{" "}
            depois de a organização aprovar.
          </p>
        )}
        <button className="btn btn-lg" disabled={aEnviar}>
          {aEnviar ? "A enviar…" : "Enviar"}
        </button>
      </form>
    </section>
  );
}
