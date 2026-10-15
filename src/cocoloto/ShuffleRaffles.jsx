import React from "react";
import Viscondes from "../assets/logo-viscondes.png";
import { apiFetch } from "../api";
import { PRIZES } from "../content/premios";
import "./ShuffleRaffles.css";

const Button = ({ className = "", ...props }) => (
  <button className={"btn " + className} {...props} />
);

class RaffleGrid extends React.Component {
  constructor(props) {
    super(props);

    // Rows A-Z (excluding W)
    this.rows = [];
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      if (letter !== "W") this.rows.push(letter);
    }

    this.state = {
      data: [], // items fetched from DB
      numColumns: this.props.numColumns || 60, // from parent
      showAll: false, // whether zero-position items are visible
      edited: new Set(), // IDs edited
      shuffled: new Set(), //IDS shuffled
      editedRows: new Map(),
      conflicts: new Set(),
      winners: { 1: 0, 2: 0, 3: 0 },
      loading: false,
      saving: false,
      refreshKey: 0,
      ranking: { first: 0, second: 0, third: 0 },
      first: "",
      second: "",
      third: "",
      raffle: false,
      done: false,
      getWinners: false,
      hoveredRow: null, // index of hovered row (0-based)
      hoveredCol: null, // index of hovered column (0-based)
      bigScreen: false, // modo ecrã grande (TV)
      fit: null, // tamanhos calculados para caber no ecrã
    };
    this.barRef = React.createRef();
  }

  componentDidMount() {
    this.fetchData();
    window.addEventListener("resize", this.measure);
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
  }

  componentDidUpdate(prevProps, prevState) {
    // a barra de controlos muda de altura (ex.: aparecem os prémios) -> recalcular
    if (
      this.state.bigScreen &&
      this.barRef.current &&
      this.barRef.current.offsetHeight !== this._lastBar
    ) {
      this._lastBar = this.barRef.current.offsetHeight;
      this.measure();
    }
  }

  fetchData = () => {
    this.setState({ loading: true });

    apiFetch("rifas")
      .then((res) => res.json())
      .then((result) => {
        if (!Array.isArray(result)) result = [];

        var newRanking = { first: 0, second: 0, third: 0 };

        // Filter valid IDs
        const filteredData = result.filter((item) => {
          if (item.ranking == 1) {
            newRanking["first"] = item.id;
          }
          if (item.ranking == 2) {
            newRanking["second"] = item.id;
          }
          if (item.ranking == 3) {
            newRanking["third"] = item.id;
          }
          return item.id <= this.state.numColumns * 25;
        });

        this.setState({
          data: filteredData,
          loading: false,
          ranking: newRanking,
          done: this.allPositionsFilled(filteredData),
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  allPositionsFilled = (data) => {
    //const { data } = this.state;

    if (!data || data.length === 0) return false;

    return data.every(
      (item) =>
        item.position &&
        item.position.toString().trim() !== "0" &&
        item.position.toString().trim() !== ""
    );
  };

  // Build the grid based on fixed vs zero-position items
  buildGrid = () => {
    const { data, numColumns } = this.state;

    const grid = Array.from({ length: this.rows.length }, () =>
      Array.from({ length: numColumns }, () => "")
    );

    const fixedItems = data.filter(
      (item) => item.position && item.position !== "0"
    );
    const zeroItems = data.filter(
      (item) => !item.position || item.position === "0"
    );

    // Place fixed-position items
    fixedItems.forEach((item) => {
      const rowLabel = item.position.slice(0, 1);
      const colIdx = parseInt(item.position.slice(1), 10) - 1;
      const rowIdx = this.rows.indexOf(rowLabel);
      if (rowIdx >= 0 && colIdx >= 0 && colIdx < numColumns) {
        grid[rowIdx][colIdx] = item.id;
      }
    });

    return grid;
  };

  handleCellEnter = (rowIdx, colIdx) => {
    // only update if changed to avoid extra re-renders
    if (this.state.hoveredRow !== rowIdx || this.state.hoveredCol !== colIdx) {
      this.setState({ hoveredRow: rowIdx, hoveredCol: colIdx });
    }
  };

  handleCellLeave = () => {
    // clear hover
    if (this.state.hoveredRow !== null || this.state.hoveredCol !== null) {
      this.setState({ hoveredRow: null, hoveredCol: null });
    }
  };

  shuffle = (zeroItems, numColumns, baseGrid, rows) => {
    const shuffled = [...zeroItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // copy the grid so we don't mutate caller's grid
    const newGrid = baseGrid.map((row) => row.slice());

    let zeroIdx = 0;
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < numColumns; c++) {
        if (!newGrid[r][c] && zeroIdx < shuffled.length) {
          newGrid[r][c] = shuffled[zeroIdx].id;
          zeroIdx++;
        }
      }
    }

    const shuffledIds = shuffled.map((item) => item.id);
    return { grid: newGrid, shuffledIds };
  };

  shuffleData = () => {
    const { data, numColumns } = this.state;
    const fixedItems = data.filter(
      (item) =>
        item.position &&
        String(item.position).trim() !== "" &&
        String(item.position).trim() !== "0"
    );
    const zeroItems = data.filter(
      (item) =>
        !item.position ||
        String(item.position).trim() === "" ||
        item.position === "0"
    );

    // build base grid (place fixed items)
    const baseGrid = Array.from({ length: this.rows.length }, () =>
      Array.from({ length: numColumns }, () => "")
    );
    fixedItems.forEach((item) => {
      const pos = String(item.position || "");
      if (!pos) return;
      const rowLabel = pos.slice(0, pos.search(/\d/));
      const colIdx = parseInt(pos.slice(pos.search(/\d/)), 10) - 1;
      const rowIdx = this.rows.indexOf(rowLabel);
      if (rowIdx >= 0 && colIdx >= 0 && colIdx < numColumns)
        baseGrid[rowIdx][colIdx] = item.id;
    });

    // get pure shuffle result
    const { grid: newGrid, shuffledIds } = this.shuffle(
      zeroItems,
      numColumns,
      baseGrid,
      this.rows
    );

    // map id -> assigned position from newGrid
    const idToPos = {};
    for (let r = 0; r < this.rows.length; r++) {
      for (let c = 0; c < numColumns; c++) {
        const id = newGrid[r][c];
        if (!id) continue;
        idToPos[id] = `${this.rows[r]}${c + 1}`;
      }
    }

    // update state.data positions for shuffled ids only (do not touch fixed items)
    const newData = data.map((item) => {
      if (!item) return item;
      if (idToPos[item.id]) return { ...item, position: idToPos[item.id] };
      return { ...item };
    });

    this.setState({
      data: newData,
      shuffled: new Set(shuffledIds),
      showAll: true,
    });
  };

  clearShuffled = () => {
    const { data, shuffled } = this.state;
    if (!shuffled || shuffled.size === 0) return;

    const s = new Set(Array.from(shuffled).map(String));
    const newData = data.map((it) =>
      it && s.has(String(it.id)) ? { ...it, position: "0", id: it.id } : it
    );
    this.setState({ data: newData, shuffled: new Set(), showAll: false });
  };

  handleCellChange = (rowLabel, colIdx, value, event) => {
    //return if cell is empty
    const raw = this.state.data.find((d) => String(d.id) === String(value));
    /* treat 0 or "0" as non-empty; treat null/undefined/""/" " as empty */
    const cellVal = value == null ? "" : String(value);
    const isEmpty = cellVal.trim() === "" || cellVal === "0";
    if (isEmpty) {
      event.target.innerText = "";
      return;
    }

    // Only allow values present in current data IDs
    if (value > this.state.numColumns * 25 && value != "") {
      var str = <p></p>;
      window.alert(
        `Número inválido. Escolha um número entre 1 e ` +
          this.state.numColumns * 25
      );
      // Optionally clear the cell if invalid
      event.target.innerText = "";
      return;
    }

    const position = `${rowLabel}${colIdx + 1}`;
    if (value == "") {
      console.log(" returning...");
      return;
    }

    this.setState((prevState) => {
      const data = [...prevState.data];
      const edited = new Set(prevState.edited);
      const conflicts = new Set(prevState.conflicts);

      const existingItem = data.find((item) => item.id == value);

      if (
        existingItem &&
        existingItem.position !== position &&
        existingItem.position != "0"
      ) {
        const confirmed = window.confirm(
          `ID "${value}" já existe na posição ${existingItem.position}. Quer movê-lo para ${position}?`
        );
        if (!confirmed) {
          event.target.innerText = "";
          return;
        } //return {};
        existingItem.position = position;
        edited.add(Number(value));
        conflicts.delete(value);
      } else if (!existingItem) {
        data.push({ id: value, position });
        edited.add(Number(value));
        conflicts.delete(value);
      } else {
        existingItem.position = position;
        edited.add(Number(value));
        conflicts.delete(value);
      }

      return { data, edited, conflicts };
    });
  };

  savePositions = async () => {
    const { data, edited, shuffled } = this.state;
    if ((!edited || edited.size === 0) && (!shuffled || shuffled.size === 0)) {
      console.log("Nothing to save");
      return;
    }

    if (shuffled && shuffled.size > 0) {
      if (
        !window.confirm(
          "Essa ação irá salvar todos os valores na base de dados permanentemente. Prosseguir?"
        )
      ) {
        return;
      }
    }

    // show saving UI
    this.setState({ saving: true }, async () => {
      const idsToSave = Array.from(
        new Set([...Array.from(edited || []), ...Array.from(shuffled || [])])
      ).map(String);

      const newData = (this.state.data || []).map((d) => ({ ...d }));
      const updates = newData
        .filter((item) => idsToSave.includes(String(item.id)))
        .map((item) => ({ id: Number(item.id), position: item.position || "0" }));

      // Um só pedido com todas as alterações
      let ok = false;
      try {
        const resp = await apiFetch("positions", {
          method: "POST",
          body: JSON.stringify({ updates }),
        });
        const json = await resp.json();
        ok = !!(json && json.success);
        if (!ok) console.warn("Server save failed", json);
      } catch (err) {
        console.error("Network error while saving", err);
      }

      if (!ok) {
        this.setState({ saving: false });
        window.alert("Não foi possível guardar. Verifique a ligação e tente outra vez.");
        return;
      }

      this.setState((prev) => ({
        data: newData,
        edited: new Set(),
        shuffled: new Set(),
        saving: false,
        refreshKey: (prev.refreshKey || 0) + 1,
        done: this.allPositionsFilled(newData),
      }));
    });
  };

  clearEdited = () => {
    this.setState((prevState) => {
      // Clone the data to avoid mutating state directly
      const newData = prevState.data.map((item) => {
        if (prevState.edited.has(item.id)) {
          // Reset position for edited items
          return { ...item, position: "0" };
        }
        return item;
      });

      return {
        data: newData,
        edited: new Set(), // clear edited IDs
      };
    });
  };

  pickRandomAndRank = async (rank, value) => {
    const { data, ranking } = this.state;

    // Current podium value for this rank
    const podium = ranking[rank];

    // Exclude IDs already assigned to other ranks
    const excludedIds = Object.keys(ranking)
      .filter((key) => key !== rank)
      .map((key) => ranking[key]);

    if (!data || data.length === 0 || podium !== 0) {
      console.log("No data available or rank already assigned");
      return;
    }

    // Filter data to only IDs not already used in other ranks
    const filteredData = data.filter((item) => !excludedIds.includes(item.id));

    if (filteredData.length === 0) {
      console.log("No available items to assign for this rank");
      return;
    }

    // Pick a random element
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    const randomItem = filteredData[randomIndex];
    const id = randomItem.id;

    console.log("Picked random id:", id);

    // Send update to the server
    try {
      const resp = await apiFetch(
        "ranking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ranking: value }),
        }
      );
      const json = await resp.json();

      if (json && json.success) {
        console.log(`Ranking updated for id ${id}`);

        // Update local state and force re-render
        this.setState((prevState) => {
          const newData = prevState.data.map((item) =>
            item.id === id ? { ...item, ranking: value } : item
          );

          const newRanking = { ...prevState.ranking, [rank]: id };
          const newRaffle =
            newRanking["first"] == 0 ||
            newRanking["second"] == 0 ||
            newRanking["third"] == 0
              ? true
              : false;

          return {
            data: newData,
            ranking: newRanking,
            refreshKey: (prevState.refreshKey || 0) + 1,
            raffle: newRaffle,
          };
        });
      } else {
        console.error("Failed to update ranking:", json);
      }
    } catch (err) {
      console.error("Network error while updating ranking:", err);
    }
  };

  updateRanking = async (rank, number, event) => {
    const { ranking, first, second, third } = this.state;
    var id = "";

    switch (rank) {
      case "first":
        id = first;
        break;
      case "second":
        id = second;
        break;
      case "third":
        id = third;
        break;
      default:
        id = "error";
    }

    if (id == "error") {
      return;
    }

    if (Object.values(ranking).find((value) => value === id)) {
      switch (rank) {
        case "first":
          this.setState({ first: 0 });
          break;
        case "second":
          this.setState({ second: 0 });
          break;
        case "third":
          this.setState({ third: 0 });
          break;
      }
      return;
    }

    try {
      const resp = await apiFetch(
        "ranking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ranking: number }),
        }
      );
      const json = await resp.json();

      if (json && json.success) {
        console.log(`Ranking updated for id ${id}`);

        // Update local state and force re-render
        this.setState((prevState) => {
          const newData = prevState.data.map((item) =>
            item.id === id ? { ...item, ranking: number } : item
          );

          const newRanking = { ...prevState.ranking, [rank]: id };
          const newGetWinners =
            newRanking["first"] == 0 ||
            newRanking["second"] == 0 ||
            newRanking["third"] == 0
              ? true
              : false;

          return {
            data: newData,
            ranking: newRanking,
            refreshKey: (prevState.refreshKey || 0) + 1,
            getWinners: newGetWinners,
          };
        });
      } else {
        console.error("Failed to update ranking:", json);
      }
    } catch (err) {
      console.error("Network error while updating ranking:", err);
    }
  };

  getWinners = () => {
    const { ranking, first, second, third } = this.state;
    return (
      <div>
        <div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              color: PRIZES[0].color,
              fontWeight: "bold",
            }}
          >
            {PRIZES[0].name}{" "}
            <input
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[0].color,
                borderStyle: "solid",
                borderWidth: "thick",
                marginTop: "5px",
              }}
              type="number"
              min="1"
              value={first || ranking["first"] || ""}
              contentEditable={true}
              onChange={(e) =>
                this.setState({
                  first: parseInt(e.target.value, 10) || 0,
                })
              }
              onKeyDown={(e) => {
                // Allow: backspace, delete, arrows
                if (
                  ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(
                    e.key
                  )
                )
                  return;

                // Prevent any non-digit key
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }}
            />
          </label>{" "}
          {ranking["first"] == 0 ? (
            <button className="btn btn-small"
              onClick={(e) => {
                this.updateRanking("first", 1, e);
              }}
            >
              Guardar
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              color: PRIZES[1].color,
              fontWeight: "bold",
            }}
          >
            {PRIZES[1].name}{" "}
            <input
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[1].color,
                borderStyle: "solid",
                borderWidth: "thick",
                marginTop: "5px",
              }}
              type="number"
              min="1"
              value={second || ranking["second"] || ""}
              contentEditable={true}
              onChange={(e) =>
                this.setState({
                  second: parseInt(e.target.value, 10) || 0,
                })
              }
              onKeyDown={(e) => {
                // Allow: backspace, delete, arrows
                if (
                  ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(
                    e.key
                  )
                )
                  return;

                // Prevent any non-digit key
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }}
            />
          </label>{" "}
          {ranking["second"] == 0 ? (
            <button className="btn btn-small"
              key="second"
              onClick={(e) => {
                this.updateRanking("second", 2, e);
              }}
            >
              Guardar
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              color: PRIZES[2].color,
              fontWeight: "bold",
            }}
          >
            {PRIZES[2].name}{" "}
            <input
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[2].color,
                borderStyle: "solid",
                borderWidth: "thick",
                marginTop: "5px",
              }}
              type="number"
              min="1"
              value={third || ranking["third"] || ""}
              contentEditable={true}
              onChange={(e) =>
                this.setState({
                  third: parseInt(e.target.value, 10) || 0,
                })
              }
              onKeyDown={(e) => {
                // Allow: backspace, delete, arrows
                if (
                  ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(
                    e.key
                  )
                )
                  return;

                // Prevent any non-digit key
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }}
            />
          </label>{" "}
          {ranking["third"] == 0 ? (
            <button className="btn btn-small"
              key="third"
              onClick={(e) => {
                this.updateRanking("third", 3, e.target.value);
              }}
            >
              Guardar
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  raffle = () => {
    const { ranking, data } = this.state;
    const positions = { first: "", second: "", third: "" };

    data.filter((item) => {
      if (item.ranking == 1) {
        positions["first"] = item.position;
      }
      if (item.ranking == 2) {
        positions["second"] = item.position;
      }
      if (item.ranking == 3) {
        positions["third"] = item.position;
      }
    });

    return (
      <div>
        <div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              color: PRIZES[0].color,
              fontWeight: "bold",
            }}
          >
            {PRIZES[0].name}{" "}
            <input
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[0].color,
                borderStyle: "solid",
                borderWidth: "thick",
                marginTop: "5px",
              }}
              type="number"
              min="1"
              value={ranking["first"]}
            />
          </label>{" "}
          {ranking["first"] == 0 ? (
            <button className="btn btn-small"
              onClick={() => {
                this.pickRandomAndRank("first", 1);
              }}
            >
              Sortear
            </button>
          ) : (
            <label
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[0].color,
                borderStyle: "solid",
                borderWidth: "thick",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              {positions["first"]}
            </label>
          )}
        </div>
        <div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              color: PRIZES[1].color,
              fontWeight: "bold",
            }}
          >
            {PRIZES[1].name}{" "}
            <input
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[1].color,
                borderStyle: "solid",
                borderWidth: "thick",
                marginTop: "5px",
              }}
              type="number"
              min="1"
              value={ranking["second"]}
            />
          </label>{" "}
          {ranking["second"] == 0 ? (
            <button className="btn btn-small"
              key="second"
              onClick={() => {
                this.pickRandomAndRank("second", 2);
              }}
            >
              Sortear
            </button>
          ) : (
            <label
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[1].color,
                borderStyle: "solid",
                borderWidth: "thick",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              {positions["second"]}
            </label>
          )}
        </div>
        <div>
          <label
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              color: PRIZES[2].color,
              fontWeight: "bold",
            }}
          >
            {PRIZES[2].name}{" "}
            <input
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[2].color,
                borderStyle: "solid",
                borderWidth: "thick",
                marginTop: "5px",
              }}
              type="number"
              min="1"
              value={ranking["third"]}
            />
          </label>{" "}
          {positions["third"] == 0 ? (
            <button className="btn btn-small"
              key="third"
              onClick={() => {
                this.pickRandomAndRank("third", 3);
              }}
            >
              Sortear
            </button>
          ) : (
            <label
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                margin: "auto",
                textAlign: "center",
                maxWidth: "100px",
                alignItems: "center",
                borderColor: PRIZES[2].color,
                borderStyle: "solid",
                borderWidth: "thick",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              {positions["third"]}
            </label>
          )}
        </div>
      </div>
    );
  };

  buttonsResult = () => {
    const { ranking } = this.state;

    return ranking["first"] == 0 ||
      ranking["second"] == 0 ||
      ranking["third"] == 0 ? (
      <div
        key={this.state.refreshKey}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Button
          onClick={(e) =>
            this.setState({
              raffle: true,
              getWinners: false,
            })
          }
        >
          Deu chuva
        </Button>{" "}
        <Button
          onClick={(e) =>
            this.setState({
              raffle: false,
              getWinners: true,
            })
          }
        >
          A vaca cagou
        </Button>
      </div>
    ) : (
      this.raffle()
    );
  };

  buttonsEdit = () => {
    var shuffleDataBtn = (
      <Button onClick={this.shuffleData}>
        Preencher com valores aleatórios
      </Button>
    );
    var cleardataBtn = (
      <Button onClick={this.clearEdited}>Limpar alterações</Button>
    );
    var shuffleClearBtn = (
      <Button onClick={this.clearShuffled}>Limpar valores aleatórios</Button>
    );
    var save = <Button onClick={this.savePositions}>Salvar alterações</Button>;

    return (
      <div
        key={this.state.refreshKey}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {this.state.shuffled.size == 0
          ? this.state.edited.size == 0
            ? shuffleDataBtn
            : cleardataBtn
          : shuffleClearBtn}{" "}
        {this.state.edited.size == 0 && this.state.shuffled.size == 0
          ? ""
          : save}
      </div>
    );
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.measure);
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
  }

  // ---------- Modo ecrã grande (TV / monitor 75") ----------
  // Calcula o tamanho de cada célula para que a matriz inteira caiba no ecrã.
  measure = () => {
    const bar = this.barRef.current ? this.barRef.current.offsetHeight : 0;
    const cols = this.state.numColumns + 1; // + coluna das letras
    const rows = this.rows.length + 1; // + linha do cabeçalho
    const pad = 8;
    const cellW = (window.innerWidth - pad * 2) / cols;
    const cellH = (window.innerHeight - bar - pad * 2) / rows;
    // números até 4 dígitos ("1500") têm de caber na largura
    const font = Math.max(8, Math.min(cellW / 2.5, cellH * 0.62));
    this.setState({ fit: { cellW, cellH, font } });
  };

  onFullscreenChange = () => {
    if (!document.fullscreenElement && this.state.bigScreen) {
      this.setState({ bigScreen: false });
    }
  };

  toggleBigScreen = () => {
    const bigScreen = !this.state.bigScreen;
    this.setState({ bigScreen }, () => {
      if (bigScreen) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
        this.measure();
      } else if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    });
  };

  render() {
    const {
      numColumns,
      edited,
      conflicts,
      shuffled,
      loading,
      saving,
      refreshKey,
      raffle,
      getWinners,
      done,
      bigScreen,
      fit,
    } = this.state;
    const grid = this.buildGrid();

    const header = ["#"];
    for (let i = 1; i <= numColumns; i++) header.push(i);

    const cellStyle = bigScreen && fit
      ? {
          width: fit.cellW + "px",
          minWidth: 0,
          maxWidth: "none",
          height: fit.cellH + "px",
          fontSize: fit.font + "px",
          padding: 0,
          lineHeight: 1,
        }
      : {};

    return (
      <div
        key={refreshKey}
        className={"raffle-root" + (bigScreen ? " big-screen" : "")}
        style={{
          "--p1": PRIZES[0].color,
          "--p2": PRIZES[1].color,
          "--p3": PRIZES[2].color,
        }}
      >
        {saving && (
          <div className="saving-overlay">
            <div>Aguarde enquanto os valores estão a ser guardados</div>
          </div>
        )}
        <div className="raffle-bar" ref={this.barRef} key={refreshKey}>
          <img src={Viscondes} className="bar-logo" alt="" />
          <div className="raffle-controls">
            {done ? this.buttonsResult() : this.buttonsEdit()}
            {raffle ? this.raffle() : ""}
            {getWinners ? this.getWinners() : ""}
          </div>
          <div className="raffle-actions">
            <button className="btn btn-ghost" onClick={this.fetchData} title="Recarregar da base de dados">
              ↻ Atualizar
            </button>
            <button className="btn btn-big" onClick={this.toggleBigScreen}>
              {bigScreen ? "Sair do ecrã grande" : "⛶ Ecrã grande"}
            </button>
          </div>
        </div>

        {loading && <div className="raffle-loading">A carregar…</div>}
        <div className="raffle-table-wrap">
          <table className="raffle-table">
            <thead>
              <tr>
                {header.map((h, idx) => {
                  const colIndex = idx - 1; // header[0] is "#"
                  const isHoverCol =
                    colIndex >= 0 && this.state.hoveredCol === colIndex;
                  return (
                    <th
                      key={idx}
                      className={isHoverCol ? "hl" : ""}
                      style={cellStyle}
                    >
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {this.rows.map((rowLabel, rIdx) => {
                const isHoverRow = this.state.hoveredRow === rIdx;
                return (
                  <tr key={rowLabel}>
                    <th
                      scope="row"
                      className={"row-label" + (isHoverRow ? " hl" : "")}
                      style={cellStyle}
                    >
                      {rowLabel}
                    </th>

                    {grid[rIdx].map((cell, cIdx) => {
                      const item = this.state.data.find((d) => d.id == cell);
                      const isEdited = edited.has(cell);
                      const isConflict = conflicts.has(cell);
                      const isShuffled = shuffled.has(cell);
                      const rank = item ? Number(item.ranking) : 0;

                      let cls = "cell";
                      if (isConflict || isEdited || isShuffled) cls += " changed";
                      else if (rank >= 1 && rank <= 3) cls += " winner winner-" + rank;
                      else if (
                        this.state.hoveredCol === cIdx ||
                        this.state.hoveredRow === rIdx
                      )
                        cls += " cross";

                      return (
                        <td
                          key={`${rIdx}-${cIdx}-${cell}`}
                          className={cls}
                          contentEditable={cell ? false : true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            this.handleCellChange(
                              rowLabel,
                              cIdx,
                              e.target.innerText,
                              e
                            )
                          }
                          onKeyDown={(e) => {
                            if (
                              [
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                                "ArrowUp",
                                "ArrowDown",
                                "Tab",
                              ].includes(e.key)
                            )
                              return;
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.target.blur();
                              return;
                            }
                            // Prevent any non-digit key
                            if (!/[0-9]/.test(e.key)) e.preventDefault();
                          }}
                          onMouseEnter={() => this.handleCellEnter(rIdx, cIdx)}
                          onMouseLeave={this.handleCellLeave}
                          onFocus={() => this.handleCellEnter(rIdx, cIdx)}
                          onBlurCapture={this.handleCellLeave}
                          tabIndex={0}
                          style={cellStyle}
                        >
                          {cell ?? ""}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RaffleGrid;
