import { Link } from "react-router-dom";
import Logo from "../assets/logo-viscondes.png";
import LogoAntigo from "../assets/logo-viscondes-antigo.webp";
import { EVENTOS } from "../content/eventos";
import { CARNAVAL } from "../content/carnaval";
import MaquinaNodoa from "../components/MaquinaNodoa";
import { LEMA } from "../content/grupo";

export default function Home() {
  // Os três Carnavais mais recentes, incluindo o que aí vem ("Em breve").
  const comCorso = CARNAVAL.filter((c) => c.corso);
  const recentes = comCorso.slice(0, 3);
  const temas = comCorso.slice(0, 8).map((c) => c.corso.tema);
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1 className="hero-title">
              <span>Cartola,</span>
              <span className="roxo">bigode</span>
              <span>e folia.</span>
            </h1>
            <p className="papel lema">{LEMA}</p>
            <p className="hero-links">
              <Link className="btn" to="/grupo">
                Conhecer o grupo
              </Link>
            </p>
          </div>
          <div className="colagem" aria-hidden="true">
            <div className="cartaz cartaz-1">
              <span className="fita" />
              <img src={Logo} alt="" />
            </div>
            <div className="cartaz cartaz-2">
              <span className="fita" />
              <img src={LogoAntigo} alt="" />
            </div>
          </div>
        </div>
      </section>

      <div className="faixa" aria-hidden="true">
        <div className="faixa-texto">
          {[...temas, ...temas].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <section className="bloco">
        <div className="container">
          <div className="bloco-topo">
            <h2 className="titulo">Carnavais</h2>
            <Link className="btn" to="/carnaval">
              Ver todos os anos
            </Link>
          </div>
          <div className="cartazes">
            {recentes.map((c) => (
              <Link key={c.year} to="/carnaval" className="cartaz-ano">
                <span className="ano">
                  {c.year}
                  {c.brevemente && <span className="carimbo-breve">{c.brevemente}</span>}
                </span>
                {c.animacao === "nodoa" ? (
                  <MaquinaNodoa />
                ) : (
                  <img src={c.images?.[0]?.src || Logo} alt="" loading="lazy" />
                )}
                <h3>{c.corso.tema}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bloco bloco-roxo">
        <div className="container">
          <h2 className="titulo">Eventos</h2>
          <ul className="lista-eventos">
            {EVENTOS.map((e) => (
              <li key={e.id}>
                <Link to={`/eventos#${e.id}`} className={e.id === "cocoloto" ? "destaque" : ""}>
                  <strong>{e.name}</strong>
                  <span>{e.resumo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
