import { CARNAVAL, PALMARES } from "../content/carnaval";
import PreviaGaleria from "../components/PreviaGaleria";

function Lugar({ lugar }) {
  if (!lugar) return null;
  return <span className={lugar === 1 ? "lugar lugar-1" : "lugar"}>{lugar}.º lugar</span>;
}

export default function Carnaval() {
  return (
    <>
      <section className="cabecalho">
        <div className="container">
          <h1 className="titulo-pagina">Carnaval</h1>
          <p className="papel">
            Desde 2008 Os Viscondes saem duas vezes por Carnaval. Na quarta-feira antes do
            Carnaval há a Marcha Luminosa, um desfile mais trapalhão que marca o início da
            festa e a Chegada dos Reis. Depois vem o Corso, o desfile a sério.
          </p>
        </div>
      </section>

      <section className="bloco palmares-bloco">
        <div className="container palmares">
          <div className="palmares-item">
            <strong>{PALMARES.corso}</strong>
            <span>vitórias no Corso</span>
          </div>
          <div className="palmares-item">
            <strong>{PALMARES.marcha}</strong>
            <span>vitórias na Marcha Luminosa</span>
          </div>
          <div className="palmares-item">
            <strong>{PALMARES.publico}</strong>
            <span>Prémios do Público</span>
          </div>
        </div>
      </section>

      <section className="bloco">
        <div className="container anos-grelha">
          {CARNAVAL.map((c) =>
            c.pausa ? (
              <article key={c.year} className="ano-pausa">
                <span className="ano">{c.year}</span>
                <p>{c.pausa}</p>
              </article>
            ) : (
              <article
                key={c.year}
                className={"ano-cartaz" + (c.year >= 2023 ? " recente" : "") + (c.images?.length ? " com-imagem" : "")}
                style={{ "--c": c.accent || "var(--roxo)" }}
              >
                {c.images?.length > 0 && (
                  <div className="ano-imagens">
                    {c.images.map((img) => (
                      <img key={img.alt} src={img.src} alt={img.alt} loading="lazy" />
                    ))}
                  </div>
                )}
                <div className="ano-texto">
                  <span className="ano">{c.year}</span>
                  <dl className="desfiles">
                    <div>
                      <dt>Corso</dt>
                      <dd>
                        <span className="tema">{c.corso.tema}</span> <Lugar lugar={c.corso.lugar} />
                      </dd>
                    </div>
                    {c.marcha && (
                      <div>
                        <dt>Marcha Luminosa</dt>
                        <dd>
                          <span className="tema">{c.marcha.tema}</span>{" "}
                          <Lugar lugar={c.marcha.lugar} />
                        </dd>
                      </div>
                    )}
                  </dl>
                  {c.publico && <p className="publico">Prémio do Público</p>}
                  {c.text && <p className="ano-descricao">{c.text}</p>}
                  <PreviaGaleria fotos={c.fotos} para={`/galeria/carnaval/${c.year}`} />
                </div>
              </article>
            )
          )}
        </div>
      </section>
    </>
  );
}
