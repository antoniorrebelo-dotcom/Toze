import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Carnaval from "./pages/Carnaval";
import Grupo from "./pages/Grupo";
import GaleriaPagina from "./pages/GaleriaPagina";
import Eventos from "./pages/Eventos";
import { CocolotoHome, CocolotoRegras, CocolotoGestao } from "./pages/Cocoloto";
import NotFound from "./pages/NotFound";
import Contactos from "./pages/Contactos";
import GestaoEnvios from "./pages/GestaoEnvios";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// endereço antigo/curto para partilhar: /enviar -> formulário na página Contactos
function IrParaEnvio() {
  const { search } = useLocation();
  return <Navigate to={`/contactos${search || "?fotos"}`} replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="grupo" element={<Grupo />} />
          <Route path="galeria/:tipo/:id" element={<GaleriaPagina />} />
          <Route path="carnaval" element={<Carnaval />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="cocoloto" element={<CocolotoHome />} />
          <Route path="cocoloto/regras" element={<CocolotoRegras />} />
          <Route path="cocoloto/gestao" element={<CocolotoGestao />} />
          <Route path="contactos" element={<Contactos />} />
          <Route path="enviar" element={<IrParaEnvio />} />
          <Route path="gestao/envios" element={<GestaoEnvios />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
