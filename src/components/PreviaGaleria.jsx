import { Link } from "react-router-dom";

// Primeiras fotos + botão para a galeria completa (só aparece se houver fotos ou vídeos).
function contagem(fotos, videos) {
  const partes = [];
  if (fotos) partes.push(`${fotos} ${fotos === 1 ? "foto" : "fotos"}`);
  if (videos) partes.push(`${videos} ${videos === 1 ? "vídeo" : "vídeos"}`);
  return partes.join(" e ");
}

export default function PreviaGaleria({ fotos = [], videos = [], para, max = 3 }) {
  if (!fotos.length && !videos.length) return null;
  return (
    <div className="previa-galeria">
      {fotos.length > 0 && (
      <ul className="previa-fotos">
        {fotos.slice(0, max).map((f) => (
          <li key={f.src}>
            <Link to={para} tabIndex={-1} aria-hidden="true">
              <img src={f.src} alt="" loading="lazy" />
            </Link>
          </li>
        ))}
      </ul>
      )}
      <Link className="btn" to={para}>
        Ver galeria ({contagem(fotos.length, videos.length)})
      </Link>
    </div>
  );
}
