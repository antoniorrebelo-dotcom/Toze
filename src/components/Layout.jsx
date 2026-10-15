import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth";
import Logo from "../assets/logo-viscondes.png";

const LINKS = [
  { to: "/", label: "Início", end: true },
  { to: "/carnaval", label: "Carnaval" },
  { to: "/eventos", label: "Eventos" },
  { to: "/cocoloto", label: "Cocoloto" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const wide = pathname === "/cocoloto" && user;

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            <img src={Logo} alt="" />
            <span>Os Viscondes</span>
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
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          <strong>Os Viscondes</strong> · Salreu · fundado em 2007
        </p>
      </footer>
    </div>
  );
}
