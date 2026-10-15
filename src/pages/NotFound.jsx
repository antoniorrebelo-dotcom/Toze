import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container section">
      <h1 className="page-title">Página não encontrada</h1>
      <p>
        <Link to="/">Voltar ao início</Link>
      </p>
    </section>
  );
}
