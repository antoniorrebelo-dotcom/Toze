import { useCallback, useEffect, useRef, useState } from "react";

// Grelha de fotos; ao clicar abre em grande, com anterior/seguinte.
export default function Galeria({ fotos }) {
  const [aberta, setAberta] = useState(null); // índice da foto aberta
  const fechar = useCallback(() => setAberta(null), []);
  const mover = useCallback(
    (d) => setAberta((i) => (i === null ? i : (i + d + fotos.length) % fotos.length)),
    [fotos.length]
  );
  const botaoFechar = useRef(null);
  const toque = useRef(null);

  useEffect(() => {
    if (aberta === null) return;
    botaoFechar.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberta, fechar, mover]);

  return (
    <>
      <ul className="galeria">
        {fotos.map((f, i) => (
          <li key={f.src}>
            <button type="button" onClick={() => setAberta(i)} aria-label={`Abrir foto: ${f.alt}`}>
              <img src={f.src} alt={f.alt} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      {aberta !== null && (
        <div
          className="visor"
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          onClick={(e) => e.target === e.currentTarget && fechar()}
          onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (toque.current === null) return;
            const dx = e.changedTouches[0].clientX - toque.current;
            if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
            toque.current = null;
          }}
        >
          <figure>
            <img src={fotos[aberta].src} alt={fotos[aberta].alt} />
            <figcaption>
              {fotos[aberta].alt}
              <span className="visor-contador">
                {aberta + 1} / {fotos.length}
              </span>
            </figcaption>
          </figure>
          {fotos.length > 1 && (
            <>
              <button type="button" className="visor-seta visor-ant" onClick={() => mover(-1)} aria-label="Foto anterior">
                ‹
              </button>
              <button type="button" className="visor-seta visor-seg" onClick={() => mover(1)} aria-label="Foto seguinte">
                ›
              </button>
            </>
          )}
          <button type="button" ref={botaoFechar} className="visor-fechar" onClick={fechar}>
            Fechar
          </button>
        </div>
      )}
    </>
  );
}
