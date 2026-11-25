import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Contagem decrescente para o próximo Carnaval, a começar nas Marchas Luminosas
// (quarta-feira antes do fim de semana de Carnaval). Para outro ano, muda-se só esta data.
// Hora de Portugal continental: em fevereiro é igual a UTC ("Z").
const INICIO = new Date("2027-02-03T21:30:00Z");
const FIM = new Date("2027-02-10T00:00:00Z"); // quarta-feira de Cinzas: a contagem desaparece
const DATA_TEXTO = "quarta-feira, 3 de fevereiro de 2027";

const partes = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    [Math.floor(s / 86400), "dias"],
    [Math.floor((s % 86400) / 3600), "horas"],
    [Math.floor((s % 3600) / 60), "min"],
    [s % 60, "seg"],
  ];
};

export default function ContagemCarnaval() {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (agora >= FIM.getTime()) return null;
  const comecou = agora >= INICIO.getTime();

  return (
    <section className="contagem" aria-label="Contagem decrescente para o Carnaval 2027">
      <div className="container contagem-inner">
        <div className="contagem-texto">
          <p className="contagem-titulo">{comecou ? "É Carnaval!" : "Carnaval 2027"}</p>
          <p>
            {comecou ? (
              "Os Viscondes estão na rua. Até já, no Teatro a Céu Aberto!"
            ) : (
              <>
                Começa nas Marchas Luminosas, {DATA_TEXTO}. <Link to="/carnaval">20 anos d'Os Viscondes</Link>
              </>
            )}
          </p>
        </div>
        {!comecou && (
          <ol className="contagem-numeros" role="timer" aria-live="off">
            {partes(INICIO.getTime() - agora).map(([n, rotulo]) => (
              <li key={rotulo}>
                <strong>{rotulo === "dias" ? n : String(n).padStart(2, "0")}</strong>
                <span>{rotulo}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
