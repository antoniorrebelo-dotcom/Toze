import { useState } from "react";

// Vídeo do YouTube: mostra um cartão com ▶; ao carregar, abre o leitor no próprio site.
// Por baixo há sempre a ligação para o vídeo no YouTube (funciona mesmo onde o leitor não carrega).
export default function VideoYouTube({ id, titulo = "Vídeo", vertical = false }) {
  const [aberto, setAberto] = useState(false);
  const url = vertical ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
  return (
    <>
      {aberto ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={titulo}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt-capa" onClick={() => setAberto(true)} aria-label={`Ver ${titulo}`}>
          <span className="yt-play" aria-hidden="true">▶</span>
          <span className="yt-rotulo">{titulo}</span>
        </button>
      )}
      <a className="yt-link" href={url} target="_blank" rel="noopener noreferrer">
        Ver no YouTube ↗
      </a>
    </>
  );
}
