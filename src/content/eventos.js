// ============================================================
//  EVENTOS — edite os textos, datas e locais à vontade.
//  "when" e "where" são opcionais (deixe "" para esconder).
//  "fotos" (opcional): lista de fotos para a galeria do evento.
//  "videos" (opcional): vídeos para a galeria, como nos anos de Carnaval.
// ============================================================
import CocolotoLogo from "../assets/Logo_cocoloto.png";
import ComedyCartaz from "../assets/evento-comedy-session.jpg";
import RallyPlaca from "../assets/evento-rally-carrinhos.webp";
import SunsetLogo from "../assets/evento-sunset.webp";
import BikeTourLogo from "../assets/evento-biketour.webp";
import RallyFoto1 from "../assets/rally-carrinhos-1.jpg";
import RallyFoto2 from "../assets/rally-carrinhos-2.jpg";
import RallyCartaz from "../assets/rally-carrinhos-cartaz.jpg";
import RallyFoto3 from "../assets/rally-carrinhos-3.jpg";
import RallyFoto4 from "../assets/rally-carrinhos-4.jpg";
import RallyFoto5 from "../assets/rally-carrinhos-5.jpg";
import RallyVideo1 from "../assets/rally-video-1.mp4";
import RallyVideo1Capa from "../assets/rally-video-1-capa.jpg";
import RallyVideo2 from "../assets/rally-video-2.mp4";
import RallyVideo2Capa from "../assets/rally-video-2-capa.jpg";
import RallyVideo3 from "../assets/rally-video-3.mp4";
import RallyVideo3Capa from "../assets/rally-video-3-capa.jpg";
import RallyVideo4 from "../assets/rally-video-4.mp4";
import RallyVideo4Capa from "../assets/rally-video-4-capa.jpg";

export const EVENTOS = [
  {
    id: "comedy",
    name: "Os Viscondes Comedy Session",
    resumo: "Noite de stand-up com humoristas convidados. Já vai em 3 edições.",
    icon: "🎤",
    image: ComedyCartaz,
    imageAlt: "Os Viscondes Comedy Session",
    text:
      "Uma noite de stand-up e boa disposição organizada pelos Viscondes, com " +
      "humoristas convidados e plateia cheia. Já teve três edições: 2024, 2025 e 2026.",
    when: "",
    where: "Associação Cultural de Salreu",
    color: "#5b2a75",
  },
  {
    id: "cocoloto",
    name: "Cocoloto",
    resumo: "A vaca decide quem ganha. 13.ª edição em 2026.",
    icon: "🐄",
    image: CocolotoLogo,
    text:
      "O sorteio mais imprevisível de Salreu! Compra-se um número, a vaca entra no " +
      "campo dividido em quadrados e o primeiro quadrado onde ela fizer cocó dita " +
      "o vencedor. Em 2026 realiza-se a 13.ª edição.",
    when: "",
    where: "Salreu",
    color: "#0a8a3c",
    link: { to: "/cocoloto", label: "Regras e sorteio" },
  },
  {
    id: "biketour",
    name: "BikeTour dos Viscondes",
    resumo: "Salreu de bicicleta, tasca a tasca.",
    icon: "🚴",
    image: BikeTourLogo,
    imageAlt: "Logótipo do BikeTour dos Viscondes: o Visconde de bicicleta, de caneca de cerveja na mão, ao lado de um barril",
    text:
      "Passeio de bicicleta aberto a todos, em ritmo de convívio, por Salreu, " +
      "de tasca em tasca. Pedala-se pouco e brinda-se muito.",
    when: "",
    where: "",
    color: "#ef7d00",
  },
  {
    id: "rally-carrinhos",
    name: "Rally de Carrinhos de Mão",
    resumo: "1.ª edição em 2026, na Festa Náutica de Salreu.",
    icon: "🛒",
    image: RallyPlaca,
    imageAlt: "Placa do 1.º Rally de Carrinhos de Mão",
    text:
      "A corrida de carrinhos de mão teve a 1.ª edição em 2026, coorganizada por Os Viscondes " +
      "e pela Junta de Freguesia de Salreu, por ocasião da Festa Náutica de Salreu. Os " +
      "participantes foram muitos, o público mais ainda, e não faltaram as gargalhadas.",
    when: "28 de junho de 2026, às 15h",
    where: "Festa Náutica de Salreu",
    fotos: [
      { src: RallyCartaz, alt: "Rally de Carrinhos de Mão" },
      { src: RallyFoto1, alt: "Rally de Carrinhos de Mão" },
      { src: RallyFoto2, alt: "Rally de Carrinhos de Mão" },
      { src: RallyFoto3, alt: "Rally de Carrinhos de Mão" },
      { src: RallyFoto4, alt: "Rally de Carrinhos de Mão" },
      { src: RallyFoto5, alt: "Rally de Carrinhos de Mão" },
    ],
    videos: [
      { src: RallyVideo1, capa: RallyVideo1Capa, alt: "Vídeo do Rally de Carrinhos de Mão" },
      { src: RallyVideo2, capa: RallyVideo2Capa, alt: "Vídeo do Rally de Carrinhos de Mão" },
      { src: RallyVideo3, capa: RallyVideo3Capa, alt: "Vídeo do Rally de Carrinhos de Mão" },
      { src: RallyVideo4, capa: RallyVideo4Capa, alt: "Vídeo do Rally de Carrinhos de Mão" },
    ],
    color: "#5b2a75",
  },
  {
    id: "sunset",
    name: "Sunset",
    resumo: "Música e pôr do sol.",
    icon: "🌅",
    image: SunsetLogo,
    imagePequena: true,
    imageAlt: "Logótipo da Sunset \u201cA Turbinar\u201d: o Visconde e a foca a fazer de DJ",
    text:
      "Fim de tarde com música, bebidas frescas e o pôr do sol. A festa de verão " +
      "dos Viscondes.",
    when: "",
    where: "",
    color: "#e2231a",
  },
];
