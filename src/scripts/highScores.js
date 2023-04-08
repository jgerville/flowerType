import Util from "./utilities";

class HighScores {
  constructor() {
    this.scoreData = [];
    this.mode = "normal";
  }

  async init() {
    await this.getScores("normal");
    this._render();
  }

  async getScores(scoreType) {
    const rawResponse = await fetch(`/getScores/${scoreType}`);
    const data = await rawResponse.json();
    this.scoreData = data;
    return data;
  }

  async postScore(name, wpm, errors, kind = this.mode) {
    const rawResponse = await fetch("/postScore", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind,
        name,
        wpm,
        errors,
      }),
    });
    const data = await rawResponse.json();
    this.scoreData = data;
    const rank = data.findIndex((score) => score.wpm == wpm);
    this._render(rank, name, wpm, errors, kind);
    return rank;
  }

  async pokeMode() {
    this.mode = "pokemon";
    Util.q(".table-caption").innerText = "High Scores (Pokemon Mode)";
    await this.getScores("pokemon");
    this._clearTable();
    this._render();
  }

  normalMode() {
    this.mode = "normal";
  }

  _clearTable() {
    for (let i = 0; i < 5; i++) {
      const targetSelector = `.score${i + 1}`;
      const targetContainer = Util.q(targetSelector);
      Util.removeChildren(targetContainer);
    }

    const yourScoreContainer = Util.q(".your-score");
    Util.removeChildren(yourScoreContainer);
  }

  _render(newRank, newName, newWPM, newErrors, newKind = this.mode) {
    let currentRank = 1;
    let ranksToAdd = 0;
    let lowestWPMOnLeaderboard;
    for (let i = 0; i < this.scoreData.length; i++) {
      if (i === 5) break;
      if (i === this.scoreData.length - 1 || i === 4) {
        lowestWPMOnLeaderboard = this.scoreData[i].wpm;
      }

      const wpm = this.scoreData[i].wpm;
      const errors = this.scoreData[i].info.errors;

      if (i > 0) {
        const prevWpm = this.scoreData[i - 1].wpm;
        const prevErrors = this.scoreData[i - 1].info.errors;
        if (wpm === prevWpm && errors === prevErrors) {
          ranksToAdd++;
        } else {
          // if there were ties earlier, we must increase the rank #.
          // e.g. 1, 1, 2, 3, 4: BAD
          // e.g. 1, 1, 3, 4, 5: GOOD
          ranksToAdd++;
          currentRank += ranksToAdd;
          ranksToAdd = 0;
        }
      }

      const targetSelector = `.score${i + 1}`;
      const rank = `${currentRank}`;
      const kind = newKind;
      const name = this.scoreData[i].username;

      this._renderRow(targetSelector, rank, kind, name, wpm, errors);
    }

    if (newWPM < lowestWPMOnLeaderboard) {
      const targetSelector = ".your-score";
      this._renderRow(
        targetSelector,
        `${newRank}`,
        newKind,
        newName,
        newWPM,
        newErrors
      );
    }
  }

  _renderRow(containerSelector, newRank, newKind, newName, newWPM, newErrors) {
    const targetContainer = Util.q(containerSelector);
    Util.removeChildren(targetContainer);

    const rank = document.createElement("h4");
    rank.classList.add("table-cell");
    rank.append(`${newRank}`);
    if (newRank == 1) {
      rank.append(" 🥇");
    } else if (newRank == 2) {
      rank.append(" 🥈");
    } else if (newRank == 3) {
      rank.append(" 🥉");
    }

    const name = document.createElement("span");
    name.classList.add("table-cell");
    name.append(newName);

    const wpm = document.createElement("span");
    wpm.classList.add("table-cell");

    wpm.append(newWPM);

    const errors = document.createElement("span");
    errors.classList.add("table-cell");
    errors.append(newErrors);

    targetContainer.append(rank);
    targetContainer.append(name);
    targetContainer.append(wpm);
    targetContainer.append(errors);
  }
}

export default HighScores;
