import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Carnaval from "./pages/Carnaval";
import Grupo from "./pages/Grupo";
import GaleriaPagina from "./pages/GaleriaPagina";
import Eventos from "./pages/Eventos";
import { CocolotoHome, CocolotoRegras, CocolotoGestao } from "./pages/Cocoloto";
import NotFound from "./pages/NotFound";
import Enviar from "./pages/Enviar";
import GestaoEnvios from "./pages/GestaoEnvios";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
          <Route path="enviar" element={<Enviar />} />
          <Route path="gestao/envios" element={<GestaoEnvios />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
