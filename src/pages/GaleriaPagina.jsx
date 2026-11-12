import { Link, useParams } from "react-router-dom";
import Galeria from "../components/Galeria";
import { DESFILES } from "../content/carnaval";
import { EVENTOS } from "../content/eventos";
import { CONTACTOS } from "../content/contactos";

export default function GaleriaPagina() {
  const { tipo, id } = useParams();
  let titulo, sub, fotos, videos = [], voltar, voltarTexto;
  if (tipo === "carnaval") {
    const c = DESFILES.find((d) => String(d.year) === id);
    if (c) {
      titulo = `Carnaval ${c.year}`;
      sub = c.marcha ? `${c.corso.tema} · ${c.marcha.tema}` : c.corso.tema;
      fotos = c.fotos || [];
      videos = c.videos || [];
    }
    voltar = "/carnaval";
    voltarTexto = "Carnaval";
  } else {
    const e = EVENTOS.find((ev) => ev.id === id);
    if (e) {
      titulo = e.name;
      fotos = e.fotos || [];
      videos = e.videos || [];
    }
    voltar = `/eventos#${id}`;
    voltarTexto = "Eventos";
  }

  return (
    <section className="container section">
      <p className="back-link">
        <Link to={voltar}>← {voltarTexto}</Link>
      </p>
      <h1 className="titulo-pagina galeria-titulo">{titulo || "Galeria não encontrada"}</h1>
      {sub && <p className="papel">{sub}</p>}

      {videos.length > 0 && (
        <div className="galeria-videos">
          {videos.map((v) => (
            <figure key={v.src || v.youtube} className={v.youtube ? (v.vertical ? "yt yt-vertical" : "yt") : ""}>
              {v.youtube ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtube}`}
                  title={v.alt || "Vídeo"}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video src={v.src} poster={v.capa} controls playsInline preload="none" aria-label={v.alt} />
              )}
            </figure>
          ))}
        </div>
      )}
      {fotos?.length ? (
        <Galeria fotos={fotos} />
      ) : videos.length ? null : (
        <p className="papel galeria-vazia">
          Ainda não há fotos aqui. Tem fotos deste momento? Envie-as para{" "}
          <strong>{CONTACTOS.email}</strong>.
        </p>
      )}
    </section>
  );
}
