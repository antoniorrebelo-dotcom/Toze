import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import RaffleGridSetup from "../cocoloto/RaffleGridSetup";
import CocolotoLogo from "../assets/Logo_cocoloto.png";
import { REGRAS } from "../content/regras";
import { PRIZES } from "../content/premios";

// /cocoloto — escolher entre as regras (público) e a gestão (com login)
export function CocolotoHome() {
  return (
    <section className="container section coco-home">
      <img src={CocolotoLogo} alt="13.º Cócóloto Os Viscondes, Salreu 2026" className="coco-logo" />
      <div className="coco-choices">
        <Link to="/cocoloto/regras" className="coco-choice" style={{ "--c": "var(--laranja)" }}>
          <span className="coco-title">Regras</span>
          <span className="coco-sub">Como funciona o Cocoloto e quais são os prémios</span>
        </Link>
        <Link to="/cocoloto/gestao" className="coco-choice" style={{ "--c": "var(--papel)" }}>
          <span className="coco-title">Gestão do sorteio</span>
          <span className="coco-sub">Área reservada à organização</span>
        </Link>
      </div>
    </section>
  );
}

// /cocoloto/regras — público
export function CocolotoRegras() {
  return (
    <section className="container section coco-regras">
      <p className="back-link">
        <Link to="/cocoloto">← Cocoloto</Link>
      </p>
      <h1 className="titulo-pagina">Regras do Cocoloto</h1>

      {REGRAS.video && (
        <div className="video-wrap">
          <video src={REGRAS.video} controls playsInline preload="metadata" />
        </div>
      )}

      <ol className="regras-lista">
        {REGRAS.itens.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ol>

      <h2 className="titulo">Prémios</h2>
      <ol className="premios-lista">
        {PRIZES.map((p, i) => (
          <li key={p.name} style={{ "--c": p.color }}>
            <span className="premio-pos">{i + 1}.º</span> {p.name}
          </li>
        ))}
      </ol>
    </section>
  );
}

// /cocoloto/gestao — com login
export function CocolotoGestao() {
  const { user } = useAuth();

  if (user === undefined) {
    return <p className="container section">A verificar sessão…</p>;
  }
  if (!user) return <Login />;
  return (
    <div className="cocoloto-app">
      <RaffleGridSetup />
    </div>
  );
}

function Login() {

  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const r = await login(username.trim(), password);
    setBusy(false);
    if (!r.ok) setError(r.error);
  };

  return (
    <section className="container section login-wrap">
      <p className="back-link">
        <Link to="/cocoloto">← Cocoloto</Link>
      </p>
      <img src={CocolotoLogo} alt="Cocoloto Os Viscondes" className="login-logo" />
      <form className="login-card" onSubmit={submit}>
        <h1>Área reservada</h1>
        <p>A gestão do sorteio do Cocoloto é só para a organização.</p>
        <label>
          Utilizador
          <input
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Palavra-passe
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="btn btn-lg" disabled={busy}>
          {busy ? "A entrar…" : "Entrar"}
        </button>
      </form>
    </section>
  );
}
