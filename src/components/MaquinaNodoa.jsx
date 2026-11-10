// Logótipo animado do Carnaval 2027, "No melhor Visconde cai a nódoa":
// o tambor da máquina de lavar roda com o Visconde lá dentro e a meia anda de um lado para o outro.
// As posições vêm do desenho original (765 × 1024 píxeis), aqui em percentagem para encolher à vontade.
import Fundo from "../assets/carnaval-2027-nodoa-fundo.webp";
import Tambor from "../assets/carnaval-2027-nodoa-tambor.webp";
import Meia from "../assets/carnaval-2027-nodoa-meia.webp";

export default function MaquinaNodoa() {
  return (
    <div className="maquina-nodoa" role="img" aria-label="Logótipo “No melhor Visconde cai a nódoa”: o Visconde a rodar dentro de uma máquina de lavar">
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="agua-nodoa" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="4" result="ruido">
            <animate
              attributeName="baseFrequency"
              dur="3s"
              repeatCount="indefinite"
              values="0.012 0.016;0.017 0.011;0.012 0.016"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <img className="maquina-fundo" src={Fundo} alt="" />
      <div className="maquina-vidro">
        <div className="maquina-tambor">
          <img src={Tambor} alt="" />
          <img className="maquina-meia" src={Meia} alt="" />
        </div>
      </div>
    </div>
  );
}
