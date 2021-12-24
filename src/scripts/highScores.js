import Util from "./utilities";

class HighScores {
  constructor() {
    this.scoreData = [];
    this.mode = 'normal';
  }

  async init() {
    await this.getScores();
    this._render();
  }

  async getScores() {
    const rawResponse = await fetch('/getScores/normal')
    const data = await rawResponse.json();
    this.scoreData = data;
    return data;
  }

  async getPokeScores() {
    const rawResponse = await fetch('/getScores/pokemon')
    const data = await rawResponse.json();
    this.scoreData = data;
    return data;
  }

  async postScore(name, wpm, errors, kind = this.mode) {
    const rawResponse = await fetch('/postScore', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kind, name, wpm, errors
      })
    });
    const data = await rawResponse.json();
    this.scoreData = data;
    const rank = data.findIndex((score) => score.wpm == wpm); 
    this._render(rank, name, wpm, errors, kind);
    return rank;
  }

  async pokeMode() {
    this.mode = 'pokemon';
    Util.q('.table-caption').innerText = 'High Scores (Pokemon Mode)';
    await this.getPokeScores();
    console.log(this.scoreData);
    this._clearTable();
    this._render();
  }

  normalMode() {
    this.mode = 'normal';
  }

  _clearTable() {
    for (let i = 0; i < 5; i++) {
      let targetSelector = `.score${i + 1}`;
      let targetContainer = Util.q(targetSelector);
      Util.removeChildren(targetContainer);
    }
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

      let wpm = this.scoreData[i].wpm;
      let errors = this.scoreData[i].info.errors;
      
      if (i > 0) {
        let prevWpm = this.scoreData[i - 1].wpm
        let prevErrors = this.scoreData[i - 1].info.errors;
        if (wpm === prevWpm && errors === prevErrors) {
          ranksToAdd ++;
        } else {
          // if there were ties earlier, we must increase the rank #.
          // e.g. 1, 1, 2, 3, 4: BAD
          // e.g. 1, 1, 3, 4, 5: GOOD
          ranksToAdd ++;
          currentRank += ranksToAdd;
          ranksToAdd = 0;
        }
      }

      let targetSelector = `.score${i + 1}`;
      let rank = `${currentRank}`;
      let kind = newKind;
      let name = this.scoreData[i].username;

      this._renderRow(targetSelector, rank, kind, name, wpm, errors)
    }

    if (newWPM < lowestWPMOnLeaderboard) {
      let targetSelector = '.your-score';
      this._renderRow(targetSelector, `${newRank}`, newKind, newName, newWPM, newErrors);
    }
  }

  _renderRow(containerSelector, newRank, newKind, newName, newWPM, newErrors) {
    let targetContainer = Util.q(containerSelector);
    Util.removeChildren(targetContainer);

    let rank = document.createElement('h4');
    rank.classList.add('table-cell');
    rank.append(`${newRank}`);

    let name = document.createElement('span');
    name.classList.add('table-cell')
    name.append(newName);

    let wpm = document.createElement('span');
    wpm.classList.add('table-cell');
    
    wpm.append(newWPM);

    let errors = document.createElement('span');
    errors.classList.add('table-cell')
    errors.append(newErrors);

    targetContainer.append(rank);
    targetContainer.append(name);
    targetContainer.append(wpm);
    targetContainer.append(errors);
  }
}

export default HighScores;