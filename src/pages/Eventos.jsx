import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { EVENTOS } from "../content/eventos";

export default function Eventos() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <section className="cabecalho">
        <div className="container">
          <h1 className="titulo-pagina">Eventos</h1>
          <p className="papel">Ao longo do ano, Os Viscondes organizam isto tudo.</p>
        </div>
      </section>

      <section className="bloco">
        <div className="container eventos">
          {EVENTOS.map((e) => (
            <article key={e.id} id={e.id} className="evento">
              <h2>{e.name}</h2>
              <div className="evento-corpo">
                {e.image && (
                  <img
                    className={e.imageAlt ? "cartaz-evento" : ""}
                    src={e.image}
                    alt={e.imageAlt || ""}
                    loading="lazy"
                  />
                )}
                <div>
                  <p>{e.text}</p>
                  {(e.when || e.where) && (
                    <p className="evento-meta">
                      {e.when && <span>Quando: {e.when}</span>}
                      {e.where && <span>Onde: {e.where}</span>}
                    </p>
                  )}
                  {e.fotos?.length > 0 && (
                    <div className="fotos">
                      {e.fotos.map((f) => (
                        <a key={f.src} href={f.src} target="_blank" rel="noopener noreferrer">
                          <img src={f.src} alt={f.alt} loading="lazy" />
                        </a>
                      ))}
                    </div>
                  )}
                  {e.link && (
                    <Link className="btn" to={e.link.to}>
                      {e.link.label}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
