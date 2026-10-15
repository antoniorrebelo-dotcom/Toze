import React from "react";
import ShowRaffles from "./ShuffleRaffles";
import CocolotoLogo from "../assets/Logo_cocoloto.png";
import { apiFetch } from "../api";
import "./RaffleGridSetup.css";

class RaffleGridSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numColumns: 60,
      gridReady: false,
      busy: false,
    };
  }

  // Ações de administração: preparar um sorteio novo
  clear = async (endpoint, question) => {
    if (!window.confirm(question)) return;
    if (!window.confirm("Tem a certeza? Esta ação não pode ser desfeita.")) return;
    this.setState({ busy: true });
    try {
      const resp = await apiFetch(endpoint, { method: "POST" });
      const json = await resp.json();
      window.alert(json.success ? "Feito." : "Erro: " + (json.error || "desconhecido"));
    } catch (e) {
      window.alert("Erro de ligação ao servidor.");
    }
    this.setState({ busy: false });
  };

  // Importar os dados da base de dados antiga (exportação JSON do phpMyAdmin)
  importFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!window.confirm(`Importar "${file.name}"? Substitui as posições e vencedores atuais.`)) return;
    this.setState({ busy: true });
    try {
      const text = await file.text();
      JSON.parse(text); // valida antes de enviar
      const resp = await apiFetch("import", { method: "POST", body: text });
      const json = await resp.json();
      window.alert(
        json.success
          ? `Importados ${json.imported} números.`
          : "Erro: " + (json.error || "desconhecido")
      );
    } catch (err) {
      window.alert("O ficheiro não é um JSON válido.");
    }
    this.setState({ busy: false });
  };

  render() {
    const { numColumns, gridReady, busy } = this.state;

    if (!gridReady) {
      return (
        <div className="setup">
          <img src={CocolotoLogo} className="setup-logo" alt="Cocoloto" />
          <h2 id="H2FrontPage">Gestão do sorteio</h2>
          <p id="textFrontPage">
            Escolha o número de colunas. Pode escolher qualquer valor entre 40 e 80.
          </p>
          <input
            id="inputFrontPage"
            type="number"
            min="40"
            max="80"
            value={numColumns || ""}
            onChange={(e) =>
              this.setState({ numColumns: parseInt(e.target.value, 10) || 0 })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") this.create();
            }}
            aria-label="Número de colunas"
          />
          <button id="buttonFrontPage" className="btn" onClick={this.create}>
            Criar tabela
          </button>

          <details className="admin-tools">
            <summary>Preparar um novo sorteio</summary>
            <p>
              Use no início de uma nova edição. Apaga da base de dados as posições na
              grelha e/ou os vencedores.
            </p>
            <div className="admin-buttons">
              <button
                className="btn btn-danger"
                disabled={busy}
                onClick={() =>
                  this.clear("clear-positions", "Limpar TODAS as posições da grelha?")
                }
              >
                Limpar posições
              </button>
              <button
                className="btn btn-danger"
                disabled={busy}
                onClick={() =>
                  this.clear("clear-ranking", "Limpar os vencedores (1.º, 2.º e 3.º)?")
                }
              >
                Limpar vencedores
              </button>
            </div>
            <p>
              <strong>Importar dados antigos:</strong> no phpMyAdmin, exporte a tabela{" "}
              <code>rifas</code> em formato JSON e escolha o ficheiro aqui.
            </p>
            <label className="btn btn-ghost import-btn">
              Escolher ficheiro JSON…
              <input
                type="file"
                accept=".json,application/json"
                onChange={this.importFile}
                disabled={busy}
                hidden
              />
            </label>
          </details>
        </div>
      );
    }

    // render the grid component with the user-defined columns
    return <ShowRaffles numColumns={numColumns} />;
  }

  create = () => {
    const { numColumns } = this.state;
    if (numColumns >= 40 && numColumns <= 80) this.setState({ gridReady: true });
    else alert("Valor inválido");
  };
}

export default RaffleGridSetup;
