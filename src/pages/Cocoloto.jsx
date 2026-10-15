import { useState } from "react";
import { useAuth } from "../auth";
import RaffleGridSetup from "../cocoloto/RaffleGridSetup";
import CocolotoLogo from "../assets/Logo_cocoloto.png";

export default function Cocoloto() {
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
