import { CARNAVAL } from "../content/carnaval";
import Logo from "../assets/logo-viscondes.png";

export default function Carnaval() {
  return (
    <>
      <section className="cabecalho">
        <div className="container">
          <h1 className="titulo-pagina">Carnaval</h1>
          <p className="papel">
            Todos os anos o Visconde muda de roupa. Estes são os temas com que Os Viscondes
            saíram à rua.
          </p>
        </div>
      </section>

      <section className="bloco">
        <div className="container anos">
          {CARNAVAL.map((c) => (
            <article key={c.year} className="ano-cartaz" style={{ "--c": c.accent }}>
              <div className="ano-imagens">
                {c.images.length > 0 ? (
                  c.images.map((img) => (
                    <img key={img.alt} src={img.src} alt={img.alt} loading="lazy" />
                  ))
                ) : (
                  <img className="sem-imagem" src={Logo} alt="" loading="lazy" />
                )}
              </div>
              <div className="ano-texto">
                <span className="ano">{c.year}</span>
                <h2>{c.theme}</h2>
                <p>{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
