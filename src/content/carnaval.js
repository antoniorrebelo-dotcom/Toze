// ============================================================
//  CARNAVAL — um bloco por ano.
//
//  corso:   o desfile principal do Carnaval (tema e classificação)
//  marcha:  as Marchas Luminosas, na quarta-feira antes do Carnaval
//  lugar:   1, 2, 3... ou null se não houver classificação
//  publico: true se ganharam o Prémio do Público nesse ano
//  text:    (opcional) um pequeno texto sobre esse ano
//  images:  (opcional) logótipos/fotos; coloque o ficheiro em src/assets/
//           e importe-o aqui em cima, como os que já existem
//  fotos:   (opcional) fotos para a galeria desse ano
//  videos:  (opcional) vídeos para a galeria: { src, capa, alt } para um ficheiro,
//           ou { youtube: "código do vídeo", alt } para um vídeo do YouTube
//           (o código é o que vem depois de "v=" no endereço do vídeo)
//  accent:  (opcional) cor do ano, no formato "#rrggbb"
//  brevemente: (opcional) texto como "Em breve" para um Carnaval que ainda não aconteceu.
//           Esse ano aparece na página, mas não conta para o resumo nem para os anos desfilados.
//  animacao: (opcional) "nodoa" mostra o logótipo animado da máquina de lavar
//
//  O resumo de vitórias no topo da página é calculado sozinho a partir daqui.
// ============================================================
import Kanal from "../assets/carnaval-2023-kanal.png";
import ZeDaTripla from "../assets/carnaval-2023-ze-da-tripla.png";
import Surrascar from "../assets/carnaval-2024-surrascar.png";
import Corso2024a from "../assets/carnaval-2024-3.jpg";
import Corso2024b from "../assets/carnaval-2024-2.jpg";
import Corso2024c from "../assets/carnaval-2024-1.jpg";
import Corso2024d from "../assets/carnaval-2024-4.jpg";
import Corso2024e from "../assets/carnaval-2024-5.jpg";
import Corso2024_6 from "../assets/carnaval-2024-6.jpg";
import Corso2024_7 from "../assets/carnaval-2024-7.jpg";
import Corso2024_8 from "../assets/carnaval-2024-8.jpg";
import Corso2024_9 from "../assets/carnaval-2024-9.jpg";
import Corso2024_10 from "../assets/carnaval-2024-10.jpg";
import Corso2024_11 from "../assets/carnaval-2024-11.jpg";
import Corso2024_12 from "../assets/carnaval-2024-12.jpg";
import Video2024 from "../assets/carnaval-2024-video.mp4";
import Video2024Capa from "../assets/carnaval-2024-video-capa.jpg";
import OlhoVisconde from "../assets/carnaval-2026-olho-visconde.png";
import Turbinar from "../assets/carnaval-2025-turbinar.webp";
import SalreuWinterGames from "../assets/carnaval-2020-salreu-winter-games.webp";
import Corso2020_1 from "../assets/carnaval-2020-1.jpg";
import Corso2020_2 from "../assets/carnaval-2020-2.jpg";
import Corso2020_3 from "../assets/carnaval-2020-3.jpg";
import Corso2020_4 from "../assets/carnaval-2020-4.jpg";
import Corso2020_5 from "../assets/carnaval-2020-5.jpg";
import Corso2020_6 from "../assets/carnaval-2020-6.jpg";
import Corso2020_7 from "../assets/carnaval-2020-7.jpg";
import Corso2020_8 from "../assets/carnaval-2020-8.jpg";
import Corso2020_9 from "../assets/carnaval-2020-9.jpg";
import Corso2020_10 from "../assets/carnaval-2020-10.jpg";
import Corso2020_11 from "../assets/carnaval-2020-11.jpg";
import Corso2020_12 from "../assets/carnaval-2020-12.jpg";
import Corso2020_13 from "../assets/carnaval-2020-13.jpg";
import Corso2020_14 from "../assets/carnaval-2020-14.jpg";
import Corso2020_15 from "../assets/carnaval-2020-15.jpg";
import BotaQuimica from "../assets/carnaval-2019-bota-quimica.webp";
import Decanos from "../assets/carnaval-2017-decanos.webp";
import Escociamos from "../assets/carnaval-2016-escociamos.webp";
import AfundaMosBasket from "../assets/carnaval-2018-basquetebol.webp";
import PicNic from "../assets/carnaval-2013-pic-nic.webp";
import DesCobridores from "../assets/carnaval-2012-des-cobridores.webp";
import EscacarPedra from "../assets/carnaval-2015-escacar-pedra.webp";
import Dakar from "../assets/carnaval-2014-dakar.webp";
import NoQuartoLogo from "../assets/carnaval-2009-no-quarto-logo.webp";
import Rodeo from "../assets/carnaval-2008-rodeo-logo.webp";
import Corso2008_1 from "../assets/carnaval-2008-1.jpg";
import Corso2008_2 from "../assets/carnaval-2008-2.jpg";
import Corso2008_3 from "../assets/carnaval-2008-3.jpg";
import Corso2008_4 from "../assets/carnaval-2008-4.jpg";
import Corso2008_5 from "../assets/carnaval-2008-5.jpg";
import Corso2008_6 from "../assets/carnaval-2008-6.jpg";
import Corso2008_7 from "../assets/carnaval-2008-7.jpg";
import Corso2008_8 from "../assets/carnaval-2008-8.jpg";
import Corso2008_9 from "../assets/carnaval-2008-9.jpg";
import GredaSemeia from "../assets/carnaval-2011-greda-semeia-logo.webp";
import GameOver from "../assets/carnaval-2010-game-over.webp";
import Fb2019_1 from "../assets/carnaval-2019-fb-1.jpg";
import Fb2019_2 from "../assets/carnaval-2019-fb-2.jpg";
import Fb2019_3 from "../assets/carnaval-2019-fb-3.jpg";
import Fb2019_4 from "../assets/carnaval-2019-fb-4.jpg";
import Fb2018_1 from "../assets/carnaval-2018-fb-1.jpg";
import Fb2018_2 from "../assets/carnaval-2018-fb-2.jpg";
import Fb2018_3 from "../assets/carnaval-2018-fb-3.jpg";
import Fb2018_4 from "../assets/carnaval-2018-fb-4.jpg";
import Fb2018_5 from "../assets/carnaval-2018-fb-5.jpg";
import Fb2018_6 from "../assets/carnaval-2018-fb-6.jpg";
import Fb2018_7 from "../assets/carnaval-2018-fb-7.jpg";
import Fb2017_1 from "../assets/carnaval-2017-fb-1.jpg";
import Fb2017_2 from "../assets/carnaval-2017-fb-2.jpg";
import Fb2017_3 from "../assets/carnaval-2017-fb-3.jpg";
import Fb2017_4 from "../assets/carnaval-2017-fb-4.jpg";
import Fb2017_5 from "../assets/carnaval-2017-fb-5.jpg";
import Fb2017_6 from "../assets/carnaval-2017-fb-6.jpg";
import Fb2017_7 from "../assets/carnaval-2017-fb-7.jpg";
import Fb2017_8 from "../assets/carnaval-2017-fb-8.jpg";
import Fb2017_9 from "../assets/carnaval-2017-fb-9.jpg";
import Fb2017_10 from "../assets/carnaval-2017-fb-10.jpg";
import Fb2017_11 from "../assets/carnaval-2017-fb-11.jpg";
import Fb2017_12 from "../assets/carnaval-2017-fb-12.jpg";
import Fb2017_13 from "../assets/carnaval-2017-fb-13.jpg";
import Fb2017_14 from "../assets/carnaval-2017-fb-14.jpg";
import Fb2017_15 from "../assets/carnaval-2017-fb-15.jpg";
import Fb2010_1 from "../assets/carnaval-2010-fb-1.jpg";
import Fb2008_1 from "../assets/carnaval-2008-fb-1.jpg";
import Fb2020_1 from "../assets/carnaval-2020-fb-1.jpg";
import Fb2020_2 from "../assets/carnaval-2020-fb-2.jpg";
import Fb2020_3 from "../assets/carnaval-2020-fb-3.jpg";
import Fb2020_4 from "../assets/carnaval-2020-fb-4.jpg";
import Fb2020_5 from "../assets/carnaval-2020-fb-5.jpg";
import Fb2025_1 from "../assets/carnaval-2025-fb-1.jpg";
import Fb2025_2 from "../assets/carnaval-2025-fb-2.jpg";
import Fb2025_3 from "../assets/carnaval-2025-fb-3.jpg";
import Fb2025_4 from "../assets/carnaval-2025-fb-4.jpg";
import Fb2025_5 from "../assets/carnaval-2025-fb-5.jpg";
import Fb2025_6 from "../assets/carnaval-2025-fb-6.jpg";
import Fb2025_7 from "../assets/carnaval-2025-fb-7.jpg";
import Fb2025_8 from "../assets/carnaval-2025-fb-8.jpg";
import Fb2025_9 from "../assets/carnaval-2025-fb-9.jpg";
import Fb2025_10 from "../assets/carnaval-2025-fb-10.jpg";
import Fb2025_11 from "../assets/carnaval-2025-fb-11.jpg";
import Fb2025_12 from "../assets/carnaval-2025-fb-12.jpg";
import Fb2025_13 from "../assets/carnaval-2025-fb-13.jpg";
import OlhaLomba from "../assets/carnaval-2026-marcha-olha-lomba.jpg";
import Fb2026_1 from "../assets/carnaval-2026-fb-1.jpg";
import Fb2026_2 from "../assets/carnaval-2026-fb-2.jpg";
import Fb2026_3 from "../assets/carnaval-2026-fb-3.jpg";
import Fb2026_4 from "../assets/carnaval-2026-fb-4.jpg";
import Fb2026_5 from "../assets/carnaval-2026-fb-5.jpg";
import Fb2026_6 from "../assets/carnaval-2026-fb-6.jpg";
import Fb2026_7 from "../assets/carnaval-2026-fb-7.jpg";
import Fb2019_5 from "../assets/carnaval-2019-fb-5.jpg";
import Fb2019_6 from "../assets/carnaval-2019-fb-6.jpg";
import Fb2019_7 from "../assets/carnaval-2019-fb-7.jpg";
import Fb2019_8 from "../assets/carnaval-2019-fb-8.jpg";
import Fb2019_9 from "../assets/carnaval-2019-fb-9.jpg";
import Fb2019_10 from "../assets/carnaval-2019-fb-10.jpg";
import Fb2019_11 from "../assets/carnaval-2019-fb-11.jpg";
import Fb2019_12 from "../assets/carnaval-2019-fb-12.jpg";
import Fb2019_13 from "../assets/carnaval-2019-fb-13.jpg";
import Fb2019_14 from "../assets/carnaval-2019-fb-14.jpg";
import Corso2011_1 from "../assets/carnaval-2011-1.jpg";
import Corso2011_2 from "../assets/carnaval-2011-2.jpg";
import Corso2011_3 from "../assets/carnaval-2011-3.jpg";
import Corso2011_4 from "../assets/carnaval-2011-4.jpg";
import Fb2017_16 from "../assets/carnaval-2017-fb-16.jpg";
import Corso2012_1 from "../assets/carnaval-2012-1.jpg";
import Corso2013_1 from "../assets/carnaval-2013-1.jpg";
import Corso2016_1 from "../assets/carnaval-2016-1.jpg";
import Corso2016_2 from "../assets/carnaval-2016-2.jpg";
import Corso2016_3 from "../assets/carnaval-2016-3.jpg";
import Corso2016_4 from "../assets/carnaval-2016-4.jpg";
import Corso2016_5 from "../assets/carnaval-2016-5.jpg";
import Corso2016_6 from "../assets/carnaval-2016-6.jpg";
import Corso2016_7 from "../assets/carnaval-2016-7.jpg";
import Corso2016_8 from "../assets/carnaval-2016-8.jpg";
import Corso2016_9 from "../assets/carnaval-2016-9.jpg";
import Corso2010_1 from "../assets/carnaval-2010-1.jpg";
import Corso2010_2 from "../assets/carnaval-2010-2.jpg";
import Corso2010_3 from "../assets/carnaval-2010-3.jpg";
import Corso2010_4 from "../assets/carnaval-2010-4.jpg";
import Corso2010_5 from "../assets/carnaval-2010-5.jpg";
import Corso2010_6 from "../assets/carnaval-2010-6.jpg";
import Corso2010_7 from "../assets/carnaval-2010-7.jpg";
import Corso2010_8 from "../assets/carnaval-2010-8.jpg";
import Corso2014_1 from "../assets/carnaval-2014-1.jpg";
import Corso2014_2 from "../assets/carnaval-2014-2.jpg";
import Corso2014_3 from "../assets/carnaval-2014-3.jpg";
import Corso2014_4 from "../assets/carnaval-2014-4.jpg";
import Corso2014_5 from "../assets/carnaval-2014-5.jpg";
import Corso2012_2 from "../assets/carnaval-2012-2.jpg";
import Corso2012_3 from "../assets/carnaval-2012-3.jpg";
import Corso2012_4 from "../assets/carnaval-2012-4.jpg";
import Corso2012_5 from "../assets/carnaval-2012-5.jpg";
import Corso2012_6 from "../assets/carnaval-2012-6.jpg";
import Corso2009_1 from "../assets/carnaval-2009-1.jpg";
import Corso2009_2 from "../assets/carnaval-2009-2.jpg";
import Corso2009_3 from "../assets/carnaval-2009-3.jpg";
import Corso2009_4 from "../assets/carnaval-2009-4.jpg";
import Corso2009_5 from "../assets/carnaval-2009-5.jpg";
import Corso2009_6 from "../assets/carnaval-2009-6.jpg";
import Corso2009_7 from "../assets/carnaval-2009-7.jpg";
import Corso2009_8 from "../assets/carnaval-2009-8.jpg";
import Corso2009_9 from "../assets/carnaval-2009-9.jpg";
import Corso2009_10 from "../assets/carnaval-2009-10.jpg";

export const CARNAVAL = [
  {
    year: 2027,
    brevemente: "Em breve",
    corso: { tema: "No melhor Visconde cai a nódoa", lugar: null },
    text:
      "O Visconde foi parar à máquina de lavar: cartola, bigode, caneca e coxa de frango, " +
      "tudo a rodar no tambor. Uma nódoa na casaca e muita espuma. Vem aí!",
    animacao: "nodoa",
    accent: "#2a9fb8",
  },
  {
    year: 2026,
    corso: { tema: "Olhó Visconde do nosso Maire", lugar: 3 },
    marcha: { tema: "Olhá Lomba", lugar: 1 },
    publico: false,
    text: "A Arte Xávega levada à avenida: o barco, as juntas de bois, as gaivotas barulhentas e as sardinhas mais sexy da costa.",
    images: [
      { src: OlhoVisconde, alt: "Logótipo “Olhó Visconde do nosso Maire”" },
      { src: OlhaLomba, alt: "Logótipo das Marchas Luminosas 2026 “Olh’á Lomba!”" },
    ],
    accent: "#0b8fa8",
    fotos: [
      { src: Fb2026_1, alt: "Carnaval 2026" },
      { src: Fb2026_2, alt: "Carnaval 2026" },
      { src: Fb2026_3, alt: "Carnaval 2026" },
      { src: Fb2026_4, alt: "Carnaval 2026" },
      { src: Fb2026_5, alt: "Carnaval 2026" },
      { src: Fb2026_6, alt: "Carnaval 2026" },
      { src: Fb2026_7, alt: "Carnaval 2026" },
    ],
  },
  {
    year: 2025,
    corso: { tema: "Os Viscondes a Turbinar", lugar: 2 },
    marcha: { tema: "Avenida São Paio", lugar: null },
    publico: false,
    text: "A Turbina de Salreu virou parque aquático, com escorregas, golfinhos, focas e aves, numa inauguração tão especial que até um avião teve.",
    images: [{ src: Turbinar, alt: "Logótipo Os Viscondes \u201cA Turbinar\u201d" }],
    accent: "#ef7d00",
    fotos: [
      { src: Fb2025_1, alt: "Carnaval 2025" },
      { src: Fb2025_2, alt: "Carnaval 2025" },
      { src: Fb2025_3, alt: "Carnaval 2025" },
      { src: Fb2025_4, alt: "Carnaval 2025" },
      { src: Fb2025_5, alt: "Carnaval 2025" },
      { src: Fb2025_6, alt: "Carnaval 2025" },
      { src: Fb2025_7, alt: "Carnaval 2025" },
      { src: Fb2025_8, alt: "Carnaval 2025" },
      { src: Fb2025_9, alt: "Carnaval 2025" },
      { src: Fb2025_10, alt: "Carnaval 2025" },
      { src: Fb2025_11, alt: "Carnaval 2025" },
      { src: Fb2025_12, alt: "Carnaval 2025" },
      { src: Fb2025_13, alt: "Carnaval 2025" },
    ],
  },
  {
    year: 2024,
    corso: { tema: "Os Viscondes a Surrascar", lugar: 1 },
    marcha: { tema: "Os Viscondes a Magicar", lugar: null },
    publico: false,
    text: "A vida de um frango, do nascimento até ao abate: um ciclo que se repetia sem fim, até ao dia em que rebentou a rebelião.",
    images: [{ src: Surrascar, alt: "Logótipo Os Viscondes “A Surrascar”" }],
    fotos: [
      { src: Corso2024a, alt: "Carnaval 2024" },
      { src: Corso2024b, alt: "Carnaval 2024" },
      { src: Corso2024c, alt: "Carnaval 2024" },
      { src: Corso2024d, alt: "Carnaval 2024" },
      { src: Corso2024e, alt: "Carnaval 2024" },
      { src: Corso2024_6, alt: "Carnaval 2024" },
      { src: Corso2024_7, alt: "Carnaval 2024" },
      { src: Corso2024_8, alt: "Carnaval 2024" },
      { src: Corso2024_9, alt: "Carnaval 2024" },
      { src: Corso2024_10, alt: "Carnaval 2024" },
      { src: Corso2024_11, alt: "Carnaval 2024" },
      { src: Corso2024_12, alt: "Carnaval 2024" },
    ],
    videos: [
      { src: Video2024, capa: Video2024Capa, alt: "Vídeo do Carnaval 2024" },
      { youtube: "pnQL-MMCJbU", alt: "Vídeo do Carnaval 2024" },
    ],
    accent: "#e2231a",
  },
  {
    year: 2023,
    corso: { tema: "Os Viscondes no K'anal", lugar: 2 },
    marcha: { tema: "Babyshower d'Os Viscondes", lugar: null },
    publico: false,
    text: "O turismo na Região de Aveiro: passeios de moliceiro, o farol, as casas da Costa Nova, a tripa e os ovos moles, tudo a acabar em festa em mais um São Gonçalinho.",
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
    text: "Os Jogos Olímpicos de Inverno chegaram a Salreu: a Estância de Neve da Senhora do Monte recebeu o Teatro a Céu Aberto, com muitos percalços e ainda mais folia.",
    images: [{ src: SalreuWinterGames, alt: "Logótipo Salreu 2020 Winter Games" }],
    fotos: [
      { src: Corso2020_1, alt: "Carnaval 2020" },
      { src: Corso2020_2, alt: "Carnaval 2020" },
      { src: Corso2020_3, alt: "Carnaval 2020" },
      { src: Corso2020_4, alt: "Carnaval 2020" },
      { src: Corso2020_5, alt: "Carnaval 2020" },
      { src: Corso2020_6, alt: "Carnaval 2020" },
      { src: Corso2020_7, alt: "Carnaval 2020" },
      { src: Corso2020_8, alt: "Carnaval 2020" },
      { src: Corso2020_9, alt: "Carnaval 2020" },
      { src: Corso2020_10, alt: "Carnaval 2020" },
      { src: Corso2020_11, alt: "Carnaval 2020" },
      { src: Corso2020_12, alt: "Carnaval 2020" },
      { src: Corso2020_13, alt: "Carnaval 2020" },
      { src: Corso2020_14, alt: "Carnaval 2020" },
      { src: Corso2020_15, alt: "Carnaval 2020" },
      { src: Fb2020_1, alt: "Carnaval 2020" },
      { src: Fb2020_2, alt: "Carnaval 2020" },
      { src: Fb2020_3, alt: "Carnaval 2020" },
      { src: Fb2020_4, alt: "Carnaval 2020" },
      { src: Fb2020_5, alt: "Carnaval 2020" },
    ],
    marcha: { tema: "Música atrás das Grades", lugar: 1 },
    publico: false,
    videos: [
      { youtube: "cR_qM0vOEvM", alt: "Vídeo do Carnaval 2020" },
    ],
  },
  {
    year: 2019,
    corso: { tema: "Bota Química 2.0", lugar: 3 },
    text: "Um dia de trabalho na Quimicose, uma empresa do parque químico, até ao acidente que mudou tudo. A sequela da Bota Química de 2011.",
    images: [{ src: BotaQuimica, alt: "Logótipo Bota Química 2.0" }],
    marcha: { tema: "Somos todos Zé Firminio", lugar: 1 },
    publico: true,
    fotos: [
      { src: Fb2019_1, alt: "Carnaval 2019" },
      { src: Fb2019_2, alt: "Carnaval 2019" },
      { src: Fb2019_3, alt: "Carnaval 2019" },
      { src: Fb2019_4, alt: "Carnaval 2019" },
      { src: Fb2019_5, alt: "Carnaval 2019" },
      { src: Fb2019_6, alt: "Carnaval 2019" },
      { src: Fb2019_7, alt: "Carnaval 2019" },
      { src: Fb2019_8, alt: "Carnaval 2019" },
      { src: Fb2019_9, alt: "Carnaval 2019" },
      { src: Fb2019_10, alt: "Carnaval 2019" },
      { src: Fb2019_11, alt: "Carnaval 2019" },
      { src: Fb2019_12, alt: "Carnaval 2019" },
      { src: Fb2019_13, alt: "Carnaval 2019" },
      { src: Fb2019_14, alt: "Carnaval 2019" },
    ],
  },
  {
    year: 2018,
    corso: { tema: "Afunda-mos", lugar: 2 },
    text: "Um jogo de basquetebol à moda da NBA entre Os Viscondes de Salreu e os Canelas Toiros, mas o que contou mesmo foram os intervalos, mais do que o jogo.",
    images: [{ src: AfundaMosBasket, alt: "Logótipo Salreu Os Viscondes: o Visconde jogador de basquetebol" }],
    marcha: { tema: "Baile na Favela", lugar: null },
    publico: true,
    fotos: [
      { src: Fb2018_1, alt: "Carnaval 2018" },
      { src: Fb2018_2, alt: "Carnaval 2018" },
      { src: Fb2018_3, alt: "Carnaval 2018" },
      { src: Fb2018_4, alt: "Carnaval 2018" },
      { src: Fb2018_5, alt: "Carnaval 2018" },
      { src: Fb2018_6, alt: "Carnaval 2018" },
      { src: Fb2018_7, alt: "Carnaval 2018" },
    ],
  },
  {
    year: 2017,
    corso: { tema: "Viscondes Decanos", lugar: 1 },
    text: "O Visconde fez 10 anos e convidou todos os seus amiguinhos para uma grande festa.",
    images: [{ src: Decanos, alt: "Logótipo Viscondes Decanos" }],
    marcha: { tema: "Põe-te Fino, Os Viscondes estão no São Firmino", lugar: 1 },
    publico: true,
    videos: [
      { youtube: "2Lkkple_wjg", alt: "Vídeo do Carnaval 2017" },
      { youtube: "YX0TrsiVM1o", alt: "Vídeo do Carnaval 2017" },
    ],
    fotos: [
      { src: Fb2017_1, alt: "Carnaval 2017" },
      { src: Fb2017_2, alt: "Carnaval 2017" },
      { src: Fb2017_3, alt: "Carnaval 2017" },
      { src: Fb2017_4, alt: "Carnaval 2017" },
      { src: Fb2017_5, alt: "Carnaval 2017" },
      { src: Fb2017_6, alt: "Carnaval 2017" },
      { src: Fb2017_7, alt: "Carnaval 2017" },
      { src: Fb2017_8, alt: "Carnaval 2017" },
      { src: Fb2017_9, alt: "Carnaval 2017" },
      { src: Fb2017_10, alt: "Carnaval 2017" },
      { src: Fb2017_11, alt: "Carnaval 2017" },
      { src: Fb2017_12, alt: "Carnaval 2017" },
      { src: Fb2017_13, alt: "Carnaval 2017" },
      { src: Fb2017_14, alt: "Carnaval 2017" },
      { src: Fb2017_15, alt: "Carnaval 2017" },
      { src: Fb2017_16, alt: "Carnaval 2017" },
    ],
  },
  {
    year: 2016,
    corso: { tema: "Escocia-mos, Bravo Coração de Visconde", lugar: 1 },
    text: "Inspirado num clássico do cinema, retratou a libertação de um povo, que no nosso desfile teve um desfecho bem mais feliz.",
    images: [{ src: Escociamos, alt: "Logótipo Escociamos, Bravo Visconde" }],
    marcha: { tema: "Folclore in Rio Antuã", lugar: null },
    publico: true,
    videos: [
      { youtube: "829PG-0CcZk", alt: "Vídeo do Carnaval 2016" },
      { youtube: "e9wGQc14iy4", alt: "Vídeo do Carnaval 2016" },
      { youtube: "DP-27z0Ggj4", alt: "Vídeo do Carnaval 2016" },
      { youtube: "POobwwrdPso", vertical: true, alt: "Vídeo do Carnaval 2016" },
    ],
    fotos: [
      { src: Corso2016_1, alt: "Carnaval 2016" },
      { src: Corso2016_2, alt: "Carnaval 2016" },
      { src: Corso2016_3, alt: "Carnaval 2016" },
      { src: Corso2016_4, alt: "Carnaval 2016" },
      { src: Corso2016_5, alt: "Carnaval 2016" },
      { src: Corso2016_6, alt: "Carnaval 2016" },
      { src: Corso2016_7, alt: "Carnaval 2016" },
      { src: Corso2016_8, alt: "Carnaval 2016" },
      { src: Corso2016_9, alt: "Carnaval 2016" },
    ],
  },
  {
    year: 2015,
    corso: { tema: "Viscondes a Escacar Pedra", lugar: 2 },
    text: "Muita pedra foi escacada pelos nossos mineiros, mas a recompensa foi grande.",
    images: [{ src: EscacarPedra, alt: "Logótipo Viscondes a Escacar Pedra: o Visconde mineiro" }],
    marcha: { tema: "Apresentação do Samba Enredo d'Os Viscondes", lugar: 2 },
    publico: false,
  },
  {
    year: 2014,
    corso: { tema: "Salreu - Dakar - Até colas o Piston", lugar: 5 },
    text: "Um rally de Salreu até Dakar, numa viagem muito atribulada.",
    images: [{ src: Dakar, alt: "Logótipo Salreu-Dakar: o Visconde piloto, de capacete e com duas taças" }],
    marcha: { tema: "Discoteca Panteão - Entra Tudo", lugar: null },
    publico: true,
    videos: [
      { youtube: "2IFOaEf5UcY", alt: "Vídeo do Carnaval 2014" },
    ],
    fotos: [
      { src: Corso2014_1, alt: "Carnaval 2014" },
      { src: Corso2014_2, alt: "Carnaval 2014" },
      { src: Corso2014_3, alt: "Carnaval 2014" },
      { src: Corso2014_4, alt: "Carnaval 2014" },
      { src: Corso2014_5, alt: "Carnaval 2014" },
    ],
  },
  {
    year: 2013,
    corso: { tema: "Pic-Nic d'Os Viscondes", lugar: 2 },
    text: "Um pic-nic visto pelos olhos das formigas, com festa rija no formigueiro.",
    images: [{ src: PicNic, alt: "Logótipo Pic-Nic d'Os Viscondes" }],
    marcha: { tema: "Ultras Viscondes", lugar: 2 },
    publico: true,
    fotos: [{ src: Corso2013_1, alt: "Marchas Luminosas 2013: Ultras Viscondes" }],
  },
  {
    year: 2012,
    corso: { tema: "Os Des-Cobridores", lugar: 1 },
    text: "Saídos da Torre de Belém, os Viscondes Des-Cobridores partiram em busca de novas conquistas.",
    images: [{ src: DesCobridores, alt: "Logótipo Os Des-Cobridores: o Visconde rei, com coroa, orbe e cetro" }],
    marcha: { tema: "Eleição Miss Fanny", lugar: 3 },
    publico: false,
    fotos: [
      { src: Corso2012_2, alt: "Carnaval 2012" },
      { src: Corso2012_3, alt: "Carnaval 2012" },
      { src: Corso2012_4, alt: "Carnaval 2012" },
      { src: Corso2012_5, alt: "Carnaval 2012" },
      { src: Corso2012_6, alt: "Carnaval 2012" },
      { src: Corso2012_1, alt: "Marchas Luminosas 2012: Eleição Miss Fanny" },
    ],
  },
  {
    year: 2011,
    corso: { tema: "Greda, Semeia e Bota Química", lugar: 1 },
    text: "Agropecuária como nunca se viu: lavradores, vacas loucas, ensiladeiras e ordenhas spa.",
    images: [{ src: GredaSemeia, alt: "Logótipo Greda, Semeia e Bota Química: o Visconde agricultor, de chapéu de palha e camisa aos quadrados" }],
    marcha: { tema: "Chegada do Visconde (Ontem e Hoje)", lugar: 2 },
    publico: false,
    fotos: [
      { src: Corso2011_1, alt: "Carnaval 2011" },
      { src: Corso2011_2, alt: "Carnaval 2011" },
      { src: Corso2011_3, alt: "Carnaval 2011" },
      { src: Corso2011_4, alt: "Carnaval 2011" },
    ],
  },
  {
    year: 2010,
    corso: { tema: "Game Over Insert Coin", lugar: 8 },
    text: "Nostalgia em estado puro: os videojogos dos anos 80 ganharam vida no Carnaval de Estarreja.",
    images: [{ src: GameOver, alt: "Logótipo Game Over Insert Coin: o Visconde musculado, com um Pac-Man numa mão e uma peça de Tetris na outra" }],
    marcha: { tema: "Casamento Gay", lugar: null },
    publico: false,
    videos: [
      { youtube: "9y0uTpH33Qg", alt: "Vídeo do Carnaval 2010" },
    ],
    fotos: [
      { src: Corso2010_1, alt: "Carnaval 2010" },
      { src: Corso2010_2, alt: "Carnaval 2010" },
      { src: Corso2010_3, alt: "Carnaval 2010" },
      { src: Corso2010_4, alt: "Carnaval 2010" },
      { src: Corso2010_5, alt: "Carnaval 2010" },
      { src: Corso2010_6, alt: "Carnaval 2010" },
      { src: Corso2010_7, alt: "Carnaval 2010" },
      { src: Corso2010_8, alt: "Carnaval 2010" },
      { src: Fb2010_1, alt: "Carnaval 2010" },
    ],
  },
  {
    year: 2009,
    corso: { tema: "No Quarto com Os Viscondes", lugar: 4 },
    text: "Um Toy Story à moda de Salreu, com outros heróis e outros vilões.",
    images: [{ src: NoQuartoLogo, alt: "Logótipo No Quarto com Os Viscondes: o Visconde vestido de soldadinho de plástico verde, com uma espingarda e uma boneca loura, num quarto de brinquedos" }],
    marcha: { tema: "Dasse Comigo", lugar: null },
    publico: false,
    videos: [{ youtube: "O8Iwnn5YIUw", alt: "Vídeo do Carnaval 2009" }],
    fotos: [
      { src: Corso2009_1, alt: "Carnaval 2009" },
      { src: Corso2009_2, alt: "Carnaval 2009" },
      { src: Corso2009_3, alt: "Carnaval 2009" },
      { src: Corso2009_4, alt: "Carnaval 2009" },
      { src: Corso2009_5, alt: "Carnaval 2009" },
      { src: Corso2009_6, alt: "Carnaval 2009" },
      { src: Corso2009_7, alt: "Carnaval 2009" },
      { src: Corso2009_8, alt: "Carnaval 2009" },
      { src: Corso2009_9, alt: "Carnaval 2009" },
      { src: Corso2009_10, alt: "Carnaval 2009" },
    ],
  },
  {
    year: 2008,
    corso: { tema: "Rodeo d'Os Viscondes", lugar: 6 },
    text: "A estreia d'Os Viscondes no Carnaval: um rodeo magnífico, com muitos touros, cowboys e folia.",
    images: [{ src: Rodeo, alt: "Logótipo Rodeo dos Viscondes: o Visconde cowboy, de chapéu e laço" }],
    fotos: [
      { src: Corso2008_1, alt: "Carnaval 2008" },
      { src: Corso2008_2, alt: "Carnaval 2008" },
      { src: Corso2008_3, alt: "Carnaval 2008" },
      { src: Corso2008_4, alt: "Carnaval 2008" },
      { src: Corso2008_5, alt: "Carnaval 2008" },
      { src: Corso2008_6, alt: "Carnaval 2008" },
      { src: Corso2008_7, alt: "Carnaval 2008" },
      { src: Corso2008_8, alt: "Carnaval 2008" },
      { src: Corso2008_9, alt: "Carnaval 2008" },
      { src: Fb2008_1, alt: "Carnaval 2008" },
    ],
    videos: [{ youtube: "dt_hwFa6sq0", alt: "Vídeo do Carnaval 2008" }],
    marcha: { tema: "Pescadores", lugar: null },
    publico: false,
  },
];

// Anos com desfile (sem pausas nem o Carnaval que aí vem), do mais recente para o mais antigo.
export const DESFILES = CARNAVAL.filter((c) => c.corso && !c.brevemente);

// Contagens para o resumo no topo da página.
// Para cada desfile: quantas vezes ficaram em 1.º, 2.º e 3.º lugar.
const lugares = (desfile) =>
  [1, 2, 3].map((n) => DESFILES.filter((c) => c[desfile]?.lugar === n).length);

export const PALMARES = {
  corso: lugares("corso")[0], // vitórias no Corso
  marcha: lugares("marcha")[0], // vitórias nas Marchas Luminosas
  corsoLugares: lugares("corso"), // [1.º, 2.º, 3.º]
  marchaLugares: lugares("marcha"),
  publico: DESFILES.filter((c) => c.publico).length,
};
