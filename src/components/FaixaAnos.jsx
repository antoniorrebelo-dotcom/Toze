import { CARNAVAL } from "../content/carnaval";
import Fundo2027 from "../assets/carnaval-2027-nodoa-fundo.webp";

// Faixa no topo da página Carnaval: os logótipos de todos os anos, lado a lado.
// Clicar num ano leva a esse ano, mais abaixo na página.
//
// As fotos dos cartões carregam à medida que a página desce e empurram o conteúdo,
// por isso o salto é direto e volta a acertar-se algumas vezes enquanto elas carregam
// (pára se a pessoa mexer na página entretanto). O cartão de destino pisca a laranja.
let correcoes = [];
const pararCorrecoes = () => {
  correcoes.forEach(clearTimeout);
  correcoes = [];
};

function irParaAno(ano) {
  const alvo = document.getElementById(`ano-${ano}`);
  if (!alvo) return;
  pararCorrecoes();
  const saltar = () => alvo.scrollIntoView({ behavior: "instant", block: "start" });
  saltar();
  const margem = parseFloat(getComputedStyle(alvo).scrollMarginTop) || 0;
  correcoes = [150, 400, 800, 1300, 2000].map((t) =>
    setTimeout(() => {
      if (Math.abs(alvo.getBoundingClientRect().top - margem) > 8) saltar();
    }, t)
  );
  const mexeu = () => {
    pararCorrecoes();
    ["wheel", "touchstart", "keydown"].forEach((ev) => window.removeEventListener(ev, mexeu));
  };
  ["wheel", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, mexeu, { once: true, passive: true }));

  alvo.classList.remove("ano-destino");
  void alvo.offsetWidth; // recomeça a animação se carregar no mesmo ano duas vezes
  alvo.classList.add("ano-destino");
  setTimeout(() => alvo.classList.remove("ano-destino"), 2600);
}

export default function FaixaAnos() {
  const anos = [...CARNAVAL].reverse(); // de 2008 para 2027
  return (
    <nav className="faixa-anos" aria-label="Todos os anos">
      <ol>
        {anos.map((c) => {
          const img = c.animacao === "nodoa" ? Fundo2027 : c.images?.[0]?.src;
          const lugar = c.corso?.lugar;
          return (
            <li key={c.year} className={c.pausa ? "pausa" : c.brevemente ? "breve" : ""}>
              <button
                type="button"
                onClick={() => irParaAno(c.year)}
                title={c.pausa || c.corso?.tema}
                aria-label={`${c.year}: ${c.pausa || c.corso?.tema}`}
              >
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
