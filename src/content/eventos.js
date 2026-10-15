// ============================================================
//  EVENTOS — edite os textos, datas e locais à vontade.
//  "when" e "where" são opcionais (deixe "" para esconder).
// ============================================================
import CocolotoLogo from "../assets/Logo_cocoloto.png";

export const EVENTOS = [
  {
    id: "comedy",
    name: "Os Viscondes Comedy Session",
    icon: "🎤",
    text:
      "Uma noite de stand-up e boa disposição organizada pelos Viscondes. " +
      "Humoristas, plateia cheia e gargalhadas garantidas.",
    when: "",
    where: "",
    color: "#5b2a75",
  },
  {
    id: "cocoloto",
    name: "Cocoloto",
    icon: "🐄",
    image: CocolotoLogo,
    text:
      "O sorteio mais imprevisível de Salreu! Compra-se um número, a vaca entra no " +
      "campo dividido em quadrados e o primeiro quadrado onde ela fizer cocó dita " +
      "o vencedor. Em 2025 foi a 12.ª edição.",
    when: "",
    where: "Salreu",
    color: "#0a8a3c",
    link: { to: "/cocoloto", label: "Gestão do sorteio" },
  },
  {
    id: "biketour",
    name: "BikeTour",
    icon: "🚴",
    text:
      "Passeio de bicicleta aberto a todos, em ritmo de convívio, pelos caminhos da " +
      "nossa terra. No fim há sempre petiscos.",
    when: "",
    where: "",
    color: "#ef7d00",
  },
  {
    id: "tt",
    name: "Passeio TT",
    icon: "🚙",
    text:
      "Lama, trilhos e muita adrenalina. O passeio todo-o-terreno dos Viscondes " +
      "junta jipes, motos e amigos para um dia fora de estrada.",
    when: "",
    where: "",
    color: "#7a4e0a",
  },
  {
    id: "sunset",
    name: "Sunset",
    icon: "🌅",
    text:
      "Fim de tarde com música, bebidas frescas e o pôr do sol. A festa de verão " +
      "dos Viscondes.",
    when: "",
    where: "",
    color: "#e2231a",
  },
];
