import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { EVENTOS } from "../content/eventos";

export default function Eventos() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <section className="container section">
      <h1 className="page-title">Eventos</h1>
      <p className="lead">Ao longo do ano, Os Viscondes organizam:</p>
      <div className="event-grid">
        {EVENTOS.map((e) => (
          <article key={e.id} id={e.id} className="event-card" style={{ "--c": e.color }}>
            <div className="event-visual">
              {e.image ? (
                <img src={e.image} alt="" loading="lazy" />
              ) : (
                <span aria-hidden="true">{e.icon}</span>
              )}
            </div>
            <div className="event-body">
              <h2>{e.name}</h2>
              <p>{e.text}</p>
              {(e.when || e.where) && (
                <p className="event-meta">
                  {e.when && <span>📅 {e.when}</span>}
                  {e.where && <span>📍 {e.where}</span>}
                </p>
              )}
              {e.link && (
                <Link className="btn" to={e.link.to}>
                  {e.link.label}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
