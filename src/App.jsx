import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Carnaval from "./pages/Carnaval";
import Eventos from "./pages/Eventos";
import Cocoloto from "./pages/Cocoloto";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carnaval" element={<Carnaval />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="cocoloto" element={<Cocoloto />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
