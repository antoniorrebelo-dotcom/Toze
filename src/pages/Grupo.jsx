import { Link } from "react-router-dom";
import Logo from "../assets/logo-viscondes.png";
import { HISTORIA } from "../content/grupo";
import { DESFILES, PALMARES } from "../content/carnaval";

export default function Grupo() {
  return (
    <>
      <section className="cabecalho">
        <div className="container grupo-topo">
          <div>
            <h1 className="titulo-pagina">O Grupo</h1>
            <p className="papel">
              Fundados em 2007 em Salreu, com {DESFILES.length} Carnavais desfilados desde 2008.
            </p>
          </div>
          <div className="cartaz grupo-retrato" aria-hidden="true">
            <span className="fita" />
            <img src={Logo} alt="" />
          </div>
        </div>
      </section>

      <section className="bloco palmares-bloco">
        <div className="container palmares">
          <div className="palmares-item">
            <strong>{PALMARES.corso}</strong>
            <span>vitórias no Corso</span>
          </div>
          <div className="palmares-item">
            <strong>{PALMARES.marcha}</strong>
            <span>vitórias nas Marchas Luminosas</span>
          </div>
          <div className="palmares-item">
            <strong>{PALMARES.publico}</strong>
            <span>Prémios do Público</span>
          </div>
        </div>
      </section>

      <section className="bloco">
        <div className="container historia">
          {HISTORIA.map((h) => (
            <article key={h.titulo} className="historia-parte">
              <h2>{h.titulo}</h2>
              <div>
                {h.paragrafos.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </article>
          ))}
          <p className="historia-fim">
            <Link className="btn btn-lg" to="/carnaval">
              Ver todos os Carnavais
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
