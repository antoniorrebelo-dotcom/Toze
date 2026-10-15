// ============================================================
//  CARNAVAL — um bloco por ano em que Os Viscondes participaram.
//  Para acrescentar um ano: copie um bloco, mude o ano, o tema e o texto.
//  Imagens: coloque o ficheiro em src/assets/ e importe-o aqui em cima.
// ============================================================
import Kanal from "../assets/carnaval-2023-kanal.png";
import ZeDaTripla from "../assets/carnaval-2023-ze-da-tripla.png";
import Surrascar from "../assets/carnaval-2024-surrascar.png";

export const CARNAVAL = [
  {
    year: 2025, // TODO: confirmar o ano
    theme: "A Turbinar",
    text:
      "Boia, chapéu de palha e escorrega aquático: o Visconde trocou a cartola pelo " +
      "parque aquático, acompanhado de uma foca e de um papagaio. Os Viscondes " +
      "foram a turbinar até ao fim do desfile.",
    images: [], // TODO: adicionar o logótipo "A Turbinar"
    accent: "#ef7d00",
  },
  {
    year: 2024,
    theme: "A Surrascar",
    text:
      "Crista vermelha, cara amarela e um galo musculado ao colo: em 2024 o Visconde " +
      "foi para a brasa. Um ano de churrasco, de galos e de muita animação.",
    images: [{ src: Surrascar, alt: "Logótipo Os Viscondes “A Surrascar”" }],
    accent: "#e2231a",
  },
  {
    year: 2023,
    theme: "Os Viscondes no Kanal",
    text:
      "Em 2023 o Visconde fez-se ao canal, de caneca na mão e com a proa colorida de " +
      "um barco como pano de fundo. Com ele veio o Zé da Tripla, de avental e " +
      "tripa na mão.",
    images: [
      { src: Kanal, alt: "Logótipo Os Viscondes no Kanal" },
      { src: ZeDaTripla, alt: "Personagem Zé da Tripla" },
    ],
    accent: "#1e8fd6",
  },
  // Exemplo para acrescentar mais anos:
  // {
  //   year: 2022,
  //   theme: "Olhó Visconde do nosso Maire",
  //   text: "Escreva aqui um pequeno texto sobre esse ano.",
  //   images: [],
  //   accent: "#5b2a75",
  // },
];
