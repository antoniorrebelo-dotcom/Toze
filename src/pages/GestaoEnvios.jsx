import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { Login } from "./Cocoloto";
import Logo from "../assets/logo-viscondes.png";
import { DESTINOS, nomeDestino } from "../content/destinos";
import { DEMO, alterarEnvio, listarEnvios, urlFicheiro } from "../envios";

// /gestao/envios — a organização aprova ou apaga as fotos e vídeos enviados pelo público.
export default function GestaoEnvios() {
  const { user, logout } = useAuth();
  if (!DEMO) {
    if (user === undefined) return <p className="container section">A verificar sessão…</p>;
    if (!user)
      return (
        <Login
          voltar="/"
          voltarTexto="Início"
          texto="Aprovar as fotos e vídeos enviados pelo público é só para a organização."
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

  const carregar = useCallback(async () => {
    try {
      setErro("");
      setDados(await listarEnvios(estado));
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
        <h1 className="titulo-pagina">Fotos do público</h1>
        {sair && (
          <button type="button" className="btn btn-small btn-ghost" onClick={sair}>
            Sair
          </button>
        )}
      </div>
      <p className="papel">
        Só aparece no site o que for aprovado. Pode mudar a galeria antes de aprovar, se a pessoa se enganou no ano.
        {" "}Ligação para partilhar: <Link to="/enviar">osviscondes.com/#/enviar</Link>
      </p>

      <div className="gestao-abas" role="tablist">
        <button type="button" role="tab" aria-selected={estado === "pendente"} onClick={() => setEstado("pendente")}>
          Por aprovar{dados?.pendentes ? ` (${dados.pendentes})` : ""}
        </button>
        <button type="button" role="tab" aria-selected={estado === "aprovado"} onClick={() => setEstado("aprovado")}>
          Publicadas
        </button>
      </div>

      {erro && (
        <p className="form-error" role="alert">
          {erro}
        </p>
      )}
      {!dados && !erro && <p>A carregar…</p>}
      {dados && dados.envios.length === 0 && (
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
