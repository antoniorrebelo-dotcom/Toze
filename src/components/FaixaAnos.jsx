import { CARNAVAL } from "../content/carnaval";
import Fundo2027 from "../assets/carnaval-2027-nodoa-fundo.webp";

// Faixa no topo da página Carnaval: os logótipos de todos os anos, lado a lado.
// Clicar num ano leva a esse ano, mais abaixo na página.
export default function FaixaAnos() {
  const anos = [...CARNAVAL].reverse(); // de 2007 para 2027
  const ir = (ano) => {
    const alvo = document.getElementById(`ano-${ano}`);
    if (!alvo) return;
    const reduzido = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    alvo.scrollIntoView({ behavior: reduzido ? "auto" : "smooth", block: "start" });
  };
  return (
    <nav className="faixa-anos" aria-label="Todos os anos">
      <ol>
        {anos.map((c) => {
          const img = c.animacao === "nodoa" ? Fundo2027 : c.images?.[0]?.src;
          const lugar = c.corso?.lugar;
          return (
            <li key={c.year} className={c.pausa ? "pausa" : c.brevemente ? "breve" : ""}>
              <button type="button" onClick={() => ir(c.year)} title={c.pausa || c.corso?.tema}>
                <span className="faixa-logo">{img ? <img src={img} alt="" loading="lazy" /> : <span>—</span>}</span>
                <span className="faixa-ano">{c.year}</span>
                <span className="faixa-lugar">
                  {c.pausa ? "Pandemia" : c.brevemente ? "Em breve" : lugar ? `${lugar}.º lugar` : "Corso"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
