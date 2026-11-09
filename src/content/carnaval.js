// ============================================================
//  CARNAVAL — um bloco por ano.
//
//  corso:   o desfile principal do Carnaval (tema e classificação)
//  marcha:  a Marcha Luminosa, na quarta-feira antes do Carnaval
//  lugar:   1, 2, 3... ou null se não houver classificação
//  publico: true se ganharam o Prémio do Público nesse ano
//  text:    (opcional) um pequeno texto sobre esse ano
//  images:  (opcional) logótipos/fotos; coloque o ficheiro em src/assets/
//           e importe-o aqui em cima, como os que já existem
//  accent:  (opcional) cor do ano, no formato "#rrggbb"
//
//  O resumo de vitórias no topo da página é calculado sozinho a partir daqui.
// ============================================================
import Kanal from "../assets/carnaval-2023-kanal.png";
import ZeDaTripla from "../assets/carnaval-2023-ze-da-tripla.png";
import Surrascar from "../assets/carnaval-2024-surrascar.png";
import OlhoVisconde from "../assets/carnaval-2026-olho-visconde.png";
import Turbinar from "../assets/carnaval-2025-turbinar.webp";
import SalreuWinterGames from "../assets/carnaval-2020-salreu-winter-games.webp";
import BotaQuimica from "../assets/carnaval-2019-bota-quimica.webp";
import Decanos from "../assets/carnaval-2017-decanos.webp";
import Escociamos from "../assets/carnaval-2016-escociamos.webp";
import AfundaMosBasket from "../assets/carnaval-2018-basquetebol.webp";
import PicNic from "../assets/carnaval-2013-pic-nic.webp";
import DesCobridores from "../assets/carnaval-2012-des-cobridores.webp";
import EscacarPedra from "../assets/carnaval-2015-escacar-pedra.webp";
import Dakar from "../assets/carnaval-2014-dakar.webp";
import NoQuartoLogo from "../assets/carnaval-2009-no-quarto-logo.webp";
import Rodeo from "../assets/carnaval-2008-rodeo.webp";
import GredaSemeia from "../assets/carnaval-2011-greda-semeia.webp";
import GameOver from "../assets/carnaval-2010-game-over.webp";

export const CARNAVAL = [
  {
    year: 2026,
    corso: { tema: "Olhó Visconde do nosso Maire", lugar: 3 },
    marcha: { tema: "Olhá Lomba", lugar: 1 },
    publico: false,
    text:
      "O Visconde fez-se ao mar: canastra de peixe à cabeça, camisa vermelha e " +
      "bigode ao vento, a apregoar “Olhó Visconde do nosso Maire!”.",
    images: [{ src: OlhoVisconde, alt: "Logótipo “Olhó Visconde do nosso Maire”" }],
    accent: "#0b8fa8",
  },
  {
    year: 2025,
    corso: { tema: "Os Viscondes a Turbinar", lugar: 2 },
    marcha: { tema: "Avenida São Paio", lugar: null },
    publico: false,
    text:
      "Boia, chapéu de palha e escorrega aquático: o Visconde trocou a cartola " +
      "pelo parque aquático, com uma foca e um papagaio.",
    images: [{ src: Turbinar, alt: "Logótipo Os Viscondes \u201cA Turbinar\u201d" }],
    accent: "#ef7d00",
  },
  {
    year: 2024,
    corso: { tema: "Os Viscondes a Surrascar", lugar: 1 },
    marcha: { tema: "Os Viscondes a Magicar", lugar: null },
    publico: false,
    text: "Crista vermelha, cara amarela e um galo musculado ao colo: um ano de brasa.",
    images: [{ src: Surrascar, alt: "Logótipo Os Viscondes “A Surrascar”" }],
    accent: "#e2231a",
  },
  {
    year: 2023,
    corso: { tema: "Os Viscondes no K'anal", lugar: 2 },
    marcha: { tema: "Babyshower d'Os Viscondes", lugar: null },
    publico: false,
    text: "De caneca na mão, com a proa de um barco e o Zé da Tripla ao lado.",
    images: [
      { src: Kanal, alt: "Logótipo Os Viscondes no K'anal" },
      { src: ZeDaTripla, alt: "Personagem Zé da Tripla" },
    ],
    accent: "#1e8fd6",
  },
  {
    year: 2022,
    pausa: "Sem Carnaval (pandemia)",
  },
  {
    year: 2021,
    pausa: "Sem Carnaval (pandemia)",
  },
  {
    year: 2020,
    corso: { tema: "Salreu 2020", lugar: 1 },
    images: [{ src: SalreuWinterGames, alt: "Logótipo Salreu 2020 Winter Games" }],
    marcha: { tema: "Música atrás das Grades", lugar: 1 },
    publico: false,
  },
  {
    year: 2019,
    corso: { tema: "Bota Química 2.0", lugar: 3 },
    images: [{ src: BotaQuimica, alt: "Logótipo Bota Química 2.0" }],
    marcha: { tema: "Somos todos Zé Firminio", lugar: 1 },
    publico: true,
  },
  {
    year: 2018,
    corso: { tema: "Afunda-mos", lugar: 2 },
    images: [{ src: AfundaMosBasket, alt: "Logótipo Salreu Os Viscondes: o Visconde jogador de basquetebol" }],
    marcha: { tema: "Baile na Favela", lugar: null },
    publico: true,
  },
  {
    year: 2017,
    corso: { tema: "Viscondes Decanos", lugar: 1 },
    images: [{ src: Decanos, alt: "Logótipo Viscondes Decanos" }],
    marcha: { tema: "Põe-te Fino, Os Viscondes estão no São Firmino", lugar: 1 },
    publico: true,
  },
  {
    year: 2016,
    corso: { tema: "Escocia-mos, Bravo Coração de Visconde", lugar: 1 },
    images: [{ src: Escociamos, alt: "Logótipo Escociamos, Bravo Visconde" }],
    marcha: { tema: "Folclore in Rio Antuã", lugar: null },
    publico: true,
  },
  {
    year: 2015,
    corso: { tema: "Viscondes a Escacar Pedra", lugar: 2 },
    images: [{ src: EscacarPedra, alt: "Logótipo Viscondes a Escacar Pedra: o Visconde mineiro" }],
    marcha: { tema: "Apresentação do Samba Enredo d'Os Viscondes", lugar: 2 },
    publico: false,
  },
  {
    year: 2014,
    corso: { tema: "Salreu - Dakar - Até colas o Piston", lugar: 5 },
    images: [{ src: Dakar, alt: "Logótipo Salreu-Dakar: o Visconde piloto, de capacete e com duas taças" }],
    marcha: { tema: "Discoteca Panteão - Entra Tudo", lugar: null },
    publico: true,
  },
  {
    year: 2013,
    corso: { tema: "Pic-Nic d'Os Viscondes", lugar: 2 },
    images: [{ src: PicNic, alt: "Logótipo Pic-Nic d'Os Viscondes" }],
    marcha: { tema: "Ultras Viscondes", lugar: 2 },
    publico: true,
  },
  {
    year: 2012,
    corso: { tema: "Os Des-Cobridores", lugar: 1 },
    images: [{ src: DesCobridores, alt: "Logótipo Os Des-Cobridores: o Visconde rei, com coroa, orbe e cetro" }],
    marcha: { tema: "Eleição Miss Fanny", lugar: 3 },
    publico: false,
  },
  {
    year: 2011,
    corso: { tema: "Greda, Semeia e Bota Química", lugar: 1 },
    images: [{ src: GredaSemeia, alt: "Desenho a aguarela do carro alegórico: uma máquina agrícola laranja e verde" }],
    marcha: { tema: "Chegada do Visconde (Ontem e Hoje)", lugar: 2 },
    publico: false,
  },
  {
    year: 2010,
    corso: { tema: "Game Over Insert Coin", lugar: 8 },
    images: [{ src: GameOver, alt: "Logótipo Game Over Insert Coin: o Visconde musculado, com um Pac-Man numa mão e uma peça de Tetris na outra" }],
    marcha: { tema: "Casamento Gay", lugar: null },
    publico: false,
  },
  {
    year: 2009,
    corso: { tema: "No Quarto com Os Viscondes", lugar: 4 },
    images: [{ src: NoQuartoLogo, alt: "Logótipo No Quarto com Os Viscondes: o Visconde vestido de soldadinho de plástico verde, com uma espingarda e uma boneca loura, num quarto de brinquedos" }],
    marcha: { tema: "Dasse Comigo", lugar: null },
    publico: false,
  },
  {
    year: 2008,
    corso: { tema: "Rodeo d'Os Viscondes", lugar: 6 },
    images: [{ src: Rodeo, alt: "Desenho do carro alegórico do Rodeo d'Os Viscondes, com um touro, assinado Viscondes 2007" }],
    marcha: { tema: "Pescadores", lugar: null },
    publico: false,
  },
];

// Anos com desfile (sem os anos de pausa), do mais recente para o mais antigo.
export const DESFILES = CARNAVAL.filter((c) => c.corso);

// Contagens para o resumo no topo da página.
// Para cada desfile: quantas vezes ficaram em 1.º, 2.º e 3.º lugar.
const lugares = (desfile) =>
  [1, 2, 3].map((n) => DESFILES.filter((c) => c[desfile]?.lugar === n).length);

export const PALMARES = {
  corso: lugares("corso"),
  marcha: lugares("marcha"),
  publico: DESFILES.filter((c) => c.publico).length,
};
