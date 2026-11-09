import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth";
import Letras from "../assets/os-viscondes-letras.png";
import ErrorBoundary from "./ErrorBoundary";
import { CONTACTOS } from "../content/contactos";

const LINKS = [
  { to: "/", label: "Início", end: true },
  { to: "/grupo", label: "O Grupo" },
  { to: "/carnaval", label: "Carnaval" },
  { to: "/eventos", label: "Eventos" },
  { to: "/cocoloto", label: "Cocoloto" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const wide = pathname === "/cocoloto/gestao" && user;

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            <img className="brand-letras" src={Letras} alt="Os Viscondes" />
          </NavLink>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Menu</span>☰
          </button>
          <nav id="main-nav" className={"main-nav" + (open ? " open" : "")}>
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            {user && (
              <button className="nav-logout" onClick={logout} title={`Sessão: ${user}`}>
                Sair
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className={wide ? "main main-wide" : "main"}>
        <ErrorBoundary resetKey={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="site-footer">
        <ul className="social">
          <li>
            <a href={CONTACTOS.facebook} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z" /></svg>
              Facebook
            </a>
          </li>
          <li>
            <a href={CONTACTOS.instagram} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 5.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM21.9 7.9c-.1-1.5-.4-2.9-1.5-4s-2.5-1.4-4-1.5C14.8 2.3 9.2 2.3 7.6 2.4c-1.5.1-2.9.4-4 1.5S2.2 6.4 2.1 7.9C2 9.5 2 14.5 2.1 16.1c.1 1.5.4 2.9 1.5 4s2.5 1.4 4 1.5c1.6.1 7.2.1 8.8 0 1.5-.1 2.9-.4 4-1.5s1.4-2.5 1.5-4c.1-1.6.1-6.6 0-8.2zm-2 9.9a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.7.4s-4.4.1-5.7-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7A3.2 3.2 0 0 1 6.7 4.6c1.3-.5 4.3-.4 5.7-.4s4.4-.1 5.7.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7z" /></svg>
              Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACTOS.email}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.6L4 7.4V17h16V7.4l-8 5.2zM5.2 7l6.8 4.4L18.8 7H5.2z" /></svg>
              {CONTACTOS.email}
            </a>
          </li>
        </ul>
        <p>
          <strong>Os Viscondes</strong> · Salreu · fundado em 2007
        </p>
      </footer>
    </div>
  );
}
