import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Galeria from "../components/Galeria";
import VideoYouTube from "../components/VideoYouTube";
import { DESFILES } from "../content/carnaval";
import { EVENTOS } from "../content/eventos";
import { envioPublicos, urlFicheiro } from "../envios";

export default function GaleriaPagina() {
  const { tipo, id } = useParams();
  const destino = tipo === "carnaval" ? `carnaval-${id}` : `evento-${id}`;
  // fotos e vídeos enviados pelo público e já aprovados
  const [publico, setPublico] = useState([]);
  useEffect(() => {
    let ativo = true;
    setPublico([]);
    envioPublicos(destino).then((l) => ativo && setPublico(l));
    return () => {
      ativo = false;
    };
  }, [destino]);
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
  if (titulo) {
    const alt = (p) => (p.nome ? `Enviada por ${p.nome}` : "Enviada pelo público");
    fotos = [...fotos, ...publico.filter((p) => p.tipo === "foto").map((p) => ({ src: urlFicheiro(p.id), alt: alt(p) }))];
    videos = [...videos, ...publico.filter((p) => p.tipo === "video").map((p) => ({ src: urlFicheiro(p.id), alt: alt(p) }))];
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
                <VideoYouTube id={v.youtube} titulo={v.alt} vertical={v.vertical} />
              ) : (
                <video src={v.src} poster={v.capa} controls playsInline preload="none" aria-label={v.alt} />
              )}
            </figure>
          ))}
        </div>
      )}
      {fotos?.length ? (
        <Galeria fotos={fotos} />
      ) : videos.length || !titulo ? null : (
        <p className="papel galeria-vazia">Ainda não há fotos aqui.</p>
      )}
      {titulo && (
        <div className="galeria-enviar">
          <p>Tem fotos ou vídeos deste momento?</p>
          <Link className="btn" to={`/contactos?para=${destino}`}>
            Enviar as minhas fotos
          </Link>
        </div>
      )}
    </section>
  );
}
