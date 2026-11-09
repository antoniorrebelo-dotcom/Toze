// ============================================================
//  EVENTOS — edite os textos, datas e locais à vontade.
//  "when" e "where" são opcionais (deixe "" para esconder).
// ============================================================
import CocolotoLogo from "../assets/Logo_cocoloto.png";
import ComedyCartaz from "../assets/evento-comedy-session.jpg";

export const EVENTOS = [
  {
    id: "comedy",
    name: "Os Viscondes Comedy Session",
    resumo: "Noite de stand-up com humoristas convidados.",
    icon: "🎤",
    image: ComedyCartaz,
    imageAlt: "Os Viscondes Comedy Session",
    text:
      "Uma noite de stand-up e boa disposição organizada pelos Viscondes, com " +
      "humoristas convidados e plateia cheia.",
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
    resumo: "1.ª edição em 2026. Equipas, carrinhos e muita força de braços.",
    icon: "🛒",
    text:
      "Em 2026 Os Viscondes organizaram o 1.º Rally de Carrinhos de Mão: equipas a " +
      "empurrar carrinhos de mão por um percurso com obstáculos, entre gargalhadas " +
      "e alguns tombos.",
    when: "",
    where: "",
    color: "#5b2a75",
  },
];
