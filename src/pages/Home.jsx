import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-viscondes.png";
import LogoAntigo from "../assets/logo-viscondes-antigo.webp";
import { EVENTOS } from "../content/eventos";
import { CARNAVAL } from "../content/carnaval";
import MaquinaNodoa from "../components/MaquinaNodoa";
import VideoInicio from "../assets/inicio-video.mp4";
import VideoInicioCapa from "../assets/inicio-video-capa.jpg";

export default function Home() {
  // Os três Carnavais mais recentes, incluindo o que aí vem ("Em breve").
  const comCorso = CARNAVAL.filter((c) => c.corso);
  const recentes = comCorso.slice(0, 3);
  // Quem tem as animações desligadas vê só a imagem parada.
  const video = useRef(null);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) video.current?.pause();
  }, []);
  return (
    <>
      <section className="hero hero-video">
        <video
          ref={video}
          className="hero-fundo"
          src={VideoInicio}
          poster={VideoInicioCapa}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-veu" aria-hidden="true" />
        <div className="container hero-inner">
          <div>
            <h1 className="sr-only">Os Viscondes de Salreu</h1>
            <p className="hero-assinatura">Os Viscondes a rockar desde 2007</p>
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
