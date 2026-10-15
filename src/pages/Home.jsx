import { Link } from "react-router-dom";
import Logo from "../assets/logo-viscondes.png";
import { EVENTOS } from "../content/eventos";
import { CARNAVAL } from "../content/carnaval";

export default function Home() {
  const latest = CARNAVAL[0];
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="kicker">Salreu · desde 2007</p>
            <h1 className="hero-title">
              Os <span>Viscondes</span>
            </h1>
            <p className="lead">
              Um grupo de amigos com cartola, bigode e coxa de frango na mão. Saímos no
              Carnaval, organizamos eventos e fazemos o Cocoloto.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-lg" to="/eventos">
                Os nossos eventos
              </Link>
              <Link className="btn btn-lg btn-outline" to="/carnaval">
                Carnaval
              </Link>
            </div>
          </div>
          <img className="hero-logo" src={Logo} alt="Logótipo Os Viscondes" />
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Eventos</h2>
        <ul className="chip-list">
          {EVENTOS.map((e) => (
            <li key={e.id}>
              <Link to={`/eventos#${e.id}`} className="chip" style={{ "--c": e.color }}>
                <span aria-hidden="true">{e.icon}</span> {e.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {latest && (
        <section className="container section">
          <h2 className="section-title">Último Carnaval</h2>
          <Link to="/carnaval" className="teaser" style={{ "--c": latest.accent }}>
            <img src={latest.images[0]?.src || Logo} alt="" />
            <div>
              <span className="year-badge">{latest.year}</span>
              <h3>{latest.theme}</h3>
              <p>{latest.text}</p>
              <span className="more">Ver todos os anos →</span>
            </div>
          </Link>
        </section>
      )}
    </>
  );
}
