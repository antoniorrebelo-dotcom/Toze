import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { EVENTOS } from "../content/eventos";
import PreviaGaleria from "../components/PreviaGaleria";

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
                    className={(e.imageAlt ? "cartaz-evento" : "") + (e.imagePequena ? " pequena" : "")}
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
                  <PreviaGaleria fotos={e.fotos} videos={e.videos} para={`/galeria/evento/${e.id}`} />
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
