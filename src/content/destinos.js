// Galerias para onde o público pode enviar fotos e vídeos: cada Carnaval e cada evento.
// O código ("carnaval-2017", "evento-cocoloto") é o mesmo que o servidor guarda.
import { DESFILES } from "./carnaval";
import { EVENTOS } from "./eventos";

export const DESTINOS = [
  ...DESFILES.map((c) => ({
    codigo: `carnaval-${c.year}`,
    nome: `Carnaval ${c.year}: ${c.corso.tema}`,
    galeria: `/galeria/carnaval/${c.year}`,
    grupo: "Carnaval",
  })),
  ...EVENTOS.map((e) => ({
    codigo: `evento-${e.id}`,
    nome: e.name,
    galeria: `/galeria/evento/${e.id}`,
    grupo: "Eventos",
  })),
];

export const nomeDestino = (codigo) => DESTINOS.find((d) => d.codigo === codigo)?.nome || codigo;
