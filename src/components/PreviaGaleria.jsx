import { Link } from "react-router-dom";

// Primeiras fotos + botão para a galeria completa (só aparece se houver fotos).
export default function PreviaGaleria({ fotos, para, max = 3 }) {
  if (!fotos?.length) return null;
  return (
    <div className="previa-galeria">
      <ul className="previa-fotos">
        {fotos.slice(0, max).map((f) => (
          <li key={f.src}>
            <Link to={para} tabIndex={-1} aria-hidden="true">
              <img src={f.src} alt="" loading="lazy" />
            </Link>
          </li>
        ))}
      </ul>
      <Link className="btn" to={para}>
        Ver galeria ({fotos.length} {fotos.length === 1 ? "foto" : "fotos"})
      </Link>
    </div>
  );
}
