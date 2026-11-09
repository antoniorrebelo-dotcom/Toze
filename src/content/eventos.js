// ============================================================
//  EVENTOS — edite os textos, datas e locais à vontade.
//  "when" e "where" são opcionais (deixe "" para esconder).
//  "fotos" (opcional): lista de fotos para a galeria do evento.
// ============================================================
import CocolotoLogo from "../assets/Logo_cocoloto.png";
import ComedyCartaz from "../assets/evento-comedy-session.jpg";
import RallyPlaca from "../assets/evento-rally-carrinhos.webp";
import SunsetLogo from "../assets/evento-sunset.webp";
import RallyFoto1 from "../assets/rally-carrinhos-1.jpg";
import RallyFoto2 from "../assets/rally-carrinhos-2.jpg";

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
    name: "BikeTour",
    resumo: "Passeio de bicicleta para todos.",
    icon: "🚴",
    text:
      "Passeio de bicicleta aberto a todos, em ritmo de convívio, pelos caminhos da " +
      "nossa terra. No fim há sempre petiscos.",
    when: "",
    where: "",
    color: "#ef7d00",
  },
  {
    id: "sunset",
    name: "Sunset",
    resumo: "Música e pôr do sol.",
    icon: "🌅",
    image: SunsetLogo,
    imageAlt: "Logótipo da Sunset \u201cA Turbinar\u201d: o Visconde e a foca a fazer de DJ",
    text:
      "Fim de tarde com música, bebidas frescas e o pôr do sol. A festa de verão " +
      "dos Viscondes.",
    when: "",
    where: "",
    color: "#e2231a",
  },
  {
    id: "rally-carrinhos",
    name: "Rally de Carrinhos de Mão",
    resumo: "1.ª edição em 2026, na Festa Náutica de Salreu.",
    icon: "🛒",
    image: RallyPlaca,
    imageAlt: "Placa do 1.º Rally de Carrinhos de Mão",
    text:
      "Em 2026 Os Viscondes organizaram o 1.º Rally de Carrinhos de Mão, na Festa " +
      "Náutica de Salreu: equipas mascaradas a empurrar carrinhos de mão com um " +
      "passageiro a bordo, provas pelo caminho e muito público a assistir.",
    when: "28 de junho de 2026, às 15h",
    where: "Festa Náutica de Salreu",
    fotos: [
      { src: RallyFoto1, alt: "Prova do rally junto à vaca gigante, com o público a assistir" },
      { src: RallyFoto2, alt: "Partida de um carrinho de mão com passageira mascarada" },
    ],
    color: "#5b2a75",
  },
];
