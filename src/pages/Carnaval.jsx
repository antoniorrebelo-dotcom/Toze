import { CARNAVAL, PALMARES } from "../content/carnaval";
import PreviaGaleria from "../components/PreviaGaleria";
import MaquinaNodoa from "../components/MaquinaNodoa";

function Lugar({ lugar }) {
  if (!lugar) return null;
  return <span className={lugar === 1 ? "lugar lugar-1" : "lugar"}>{lugar}.º lugar</span>;
}

function Podio({ titulo, contas }) {
  return (
    <div className="palmares-item palmares-podio">
      <h2>{titulo}</h2>
      <ol>
        {contas.map((n, i) => (
          <li key={i} className={"podio-" + (i + 1)}>
            <strong>{n}</strong>
            <span>{i + 1}.º lugar</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Carnaval() {
  return (
    <>
      <section className="cabecalho">
        <div className="container">
          <h1 className="titulo-pagina">Carnaval</h1>
          <p className="papel">
            Desde 2008 Os Viscondes saem à rua no Carnaval de Estarreja. Há os desfiles
            principais, o Corso de domingo, e há as Marchas Luminosas, mais trapalhonas, que
            abrem a festa com a Chegada dos Reis. Nem sempre o tempo deixa, e já houve desfiles
            adiados e cancelados, mas a vontade de sair é sempre a mesma.
          </p>
        </div>
      </section>

      <section className="bloco palmares-bloco">
        <div className="container palmares">
          <Podio titulo="Corso" contas={PALMARES.corsoLugares} />
          <Podio titulo="Marchas Luminosas" contas={PALMARES.marchaLugares} />
          <div className="palmares-item palmares-publico">
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
                className={
                  "ano-cartaz" +
                  (c.year >= 2023 ? " recente" : "") +
                  (c.images?.length || c.animacao ? " com-imagem" : "") +
                  (c.brevemente ? " brevemente" : "")
                }
                style={{ "--c": c.accent || "var(--roxo)" }}
              >
                {c.animacao === "nodoa" && (
                  <div className="ano-imagens">
                    <MaquinaNodoa />
                  </div>
                )}
                {c.images?.length > 0 && (
                  <div className="ano-imagens">
                    {c.images.map((img) => (
                      <img key={img.alt} src={img.src} alt={img.alt} loading="lazy" />
                    ))}
                  </div>
                )}
                <div className="ano-texto">
                  <span className="ano">{c.year}</span>
                  {c.brevemente && <span className="carimbo-breve">{c.brevemente}</span>}
                  <dl className="desfiles">
                    <div>
                      <dt>Corso</dt>
                      <dd>
                        <span className="tema">{c.corso.tema}</span> <Lugar lugar={c.corso.lugar} />
                      </dd>
                    </div>
                    {c.marcha && (
                      <div>
                        <dt>Marchas Luminosas</dt>
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
