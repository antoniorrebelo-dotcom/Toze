import { CARNAVAL } from "../content/carnaval";
import Logo from "../assets/logo-viscondes.png";

export default function Carnaval() {
  return (
    <section className="container section">
      <h1 className="page-title">Carnaval</h1>
      <p className="lead">
        Todos os anos o Visconde muda de roupa. Estes são os temas com que Os Viscondes
        saíram à rua.
      </p>

      <ol className="timeline">
        {CARNAVAL.map((c) => (
          <li key={c.year} className="year-card" style={{ "--c": c.accent }}>
            <div className="year-marker" aria-hidden="true">
              {c.year}
            </div>
            <article>
              <header>
                <span className="year-badge">{c.year}</span>
                <h2>{c.theme}</h2>
              </header>
              <p>{c.text}</p>
              <div className="year-images">
                {c.images.length > 0 ? (
                  c.images.map((img) => (
                    <img key={img.alt} src={img.src} alt={img.alt} loading="lazy" />
                  ))
                ) : (
                  <img className="placeholder" src={Logo} alt="" loading="lazy" />
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
