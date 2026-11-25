import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { Login } from "./Cocoloto";
import Logo from "../assets/logo-viscondes.png";
import { DESTINOS, nomeDestino } from "../content/destinos";
import { DEMO, alterarEnvio, listarEnvios, urlFicheiro } from "../envios";
import { alterarMensagem, listarMensagens } from "../mensagens";

// /gestao/envios — a organização aprova ou apaga as fotos e vídeos enviados pelo público
// e lê as mensagens do formulário da página Contactos.
export default function GestaoEnvios() {
  const { user, logout } = useAuth();
  if (!DEMO) {
    if (user === undefined) return <p className="container section">A verificar sessão…</p>;
    if (!user)
      return (
        <Login
          voltar="/"
          voltarTexto="Início"
          texto="As mensagens e as fotos enviadas pelo público são só para a organização."
          logo={Logo}
          logoAlt="Os Viscondes"
        />
      );
  }
  return <Painel sair={DEMO ? null : logout} />;
}

function Painel({ sair }) {
  const [estado, setEstado] = useState("pendente");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [ocupado, setOcupado] = useState(null);

  const [porLer, setPorLer] = useState(0);
  const carregar = useCallback(async () => {
    try {
      setErro("");
      if (estado === "mensagens") {
        const m = await listarMensagens();
        setPorLer(m.porLer);
        setDados({ mensagens: m.mensagens, envios: [] });
      } else {
        setDados(await listarEnvios(estado));
        listarMensagens().then((m) => setPorLer(m.porLer)).catch(() => {});
      }
    } catch (e) {
      setErro(e.message);
    }
  }, [estado]);

  useEffect(() => {
    setDados(null);
    carregar();
  }, [carregar]);

  const agir = async (id, acao, destino) => {
    if (acao === "apagar" && !window.confirm("Apagar de vez este ficheiro?")) return;
    setOcupado(id);
    try {
      await alterarEnvio(id, acao, destino);
      await carregar();
    } catch (e) {
      setErro(e.message);
    }
    setOcupado(null);
  };

  return (
    <section className="container section gestao-envios">
      <div className="bloco-topo">
        <h1 className="titulo-pagina">Gestão</h1>
        {sair && (
          <button type="button" className="btn btn-small btn-ghost" onClick={sair}>
            Sair
          </button>
        )}
      </div>
      <p className="papel">
        Fotos e vídeos: só aparece no site o que for aprovado. Pode mudar a galeria antes de aprovar, se a pessoa se
        enganou no ano.
        {" "}Ligação para partilhar: <Link to="/enviar">osviscondes.com/#/enviar</Link> (leva ao formulário na página Contactos)
      </p>

      <div className="gestao-abas" role="tablist">
        <button type="button" role="tab" aria-selected={estado === "pendente"} onClick={() => setEstado("pendente")}>
          Por aprovar{dados?.pendentes ? ` (${dados.pendentes})` : ""}
        </button>
        <button type="button" role="tab" aria-selected={estado === "aprovado"} onClick={() => setEstado("aprovado")}>
          Publicadas
        </button>
        <button type="button" role="tab" aria-selected={estado === "mensagens"} onClick={() => setEstado("mensagens")}>
          Mensagens{porLer ? ` (${porLer})` : ""}
        </button>
      </div>

      {erro && (
        <p className="form-error" role="alert">
          {erro}
        </p>
      )}
      {!dados && !erro && <p>A carregar…</p>}
      {estado === "mensagens" && dados?.mensagens && (
        <Mensagens lista={dados.mensagens} recarregar={carregar} setErro={setErro} />
      )}
      {estado !== "mensagens" && dados && dados.envios.length === 0 && (
        <p className="papel">{estado === "pendente" ? "Não há nada por aprovar." : "Ainda não há nada publicado."}</p>
      )}

      <ul className="gestao-grelha">
        {dados?.envios.map((e) => {
          const src = DEMO && e.url ? e.url : urlFicheiro(e.id);
          return (
            <li key={e.id} className="gestao-cartao">
              <a href={src} target="_blank" rel="noopener noreferrer" className="gestao-media">
                {e.tipo === "video" ? <video src={src} preload="metadata" muted playsInline /> : <img src={src} alt="" loading="lazy" />}
                {e.tipo === "video" && <span className="gestao-tipo">Vídeo</span>}
              </a>
              <div className="gestao-info">
                <select
                  value={e.destino}
                  disabled={ocupado === e.id}
                  onChange={(ev) => agir(e.id, "destino", ev.target.value)}
                  aria-label="Galeria"
                >
                  {!DESTINOS.some((d) => d.codigo === e.destino) && <option value={e.destino}>{nomeDestino(e.destino)}</option>}
                  {DESTINOS.map((d) => (
                    <option key={d.codigo} value={d.codigo}>
                      {d.nome}
                    </option>
                  ))}
                </select>
                <p>
                  {e.nome ? <strong>{e.nome}</strong> : <em>Sem nome</em>}
                  {e.contacto && <> · {e.contacto}</>}
                </p>
                <p className="gestao-data">
                  {e.criado_em?.slice(0, 16).replace(" ", " às ")} · {(e.tamanho / 1024 / 1024).toFixed(1)} MB
                </p>
                <div className="gestao-botoes">
                  {estado === "pendente" ? (
                    <button type="button" className="btn btn-small" disabled={ocupado === e.id} onClick={() => agir(e.id, "aprovar")}>
                      Aprovar
                    </button>
                  ) : (
                    <button type="button" className="btn btn-small btn-ghost" disabled={ocupado === e.id} onClick={() => agir(e.id, "pendente")}>
                      Esconder
                    </button>
                  )}
                  <button type="button" className="btn btn-small btn-danger" disabled={ocupado === e.id} onClick={() => agir(e.id, "apagar")}>
                    Apagar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Mensagens({ lista, recarregar, setErro }) {
  const [ocupado, setOcupado] = useState(null);
  const agir = async (id, acao) => {
    if (acao === "apagar" && !window.confirm("Apagar de vez esta mensagem?")) return;
    setOcupado(id);
    try {
      await alterarMensagem(id, acao);
      await recarregar();
    } catch (e) {
      setErro(e.message);
    }
    setOcupado(null);
  };
  if (lista.length === 0) return <p className="papel">Ainda não chegou nenhuma mensagem.</p>;
  return (
    <ul className="gestao-mensagens">
      {lista.map((m) => {
        const email = /@/.test(m.resposta);
        const link = email
          ? `mailto:${m.resposta}?subject=${encodeURIComponent("Re: " + m.assunto + " — Os Viscondes")}`
          : `tel:${m.resposta.replace(/[^0-9+]/g, "")}`;
        return (
          <li key={m.id} className={m.lida ? "lida" : "por-ler"}>
            <div className="gestao-msg-topo">
              <span className="gestao-msg-assunto">{m.assunto}</span>
              <strong>{m.nome}</strong>
              <a href={link}>{m.resposta}</a>
              <span className="gestao-data">{m.criado_em?.slice(0, 16).replace(" ", " às ")}</span>
            </div>
            <p className="gestao-msg-texto">{m.texto}</p>
            <div className="gestao-botoes">
              <a className="btn btn-small" href={link} onClick={() => !m.lida && agir(m.id, "lida")}>
                {email ? "Responder" : "Ligar"}
              </a>
              <button type="button" className="btn btn-small btn-ghost" disabled={ocupado === m.id} onClick={() => agir(m.id, m.lida ? "por-ler" : "lida")}>
                {m.lida ? "Marcar por ler" : "Marcar como lida"}
              </button>
              <button type="button" className="btn btn-small btn-danger" disabled={ocupado === m.id} onClick={() => agir(m.id, "apagar")}>
                Apagar
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
