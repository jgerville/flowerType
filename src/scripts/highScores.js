import Util from "./utilities";

class HighScores {
  constructor() {
    this.scoreData = [];
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

  async postScore(kind = 'normal', name, wpm, errors) {
    const rawResponse = await fetch('/postScore', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kind, name, wpm, errors
      })
    });
    const data = await rawResponse.json();
    const scoresArray = data.Items;
    this.scoreData = scoresArray;
    const rank = scoresArray.findIndex((score) => score.wpm == wpm); 
    this._render(rank, kind, name, wpm, errors);
    return rank;
  }

  _render(newRank, newKind = 'normal', newName, newWPM, newErrors) {
    let currentRank = 1;
    let lowestWPMOnLeaderboard;
    for (let i = 0; i < this.scoreData.length; i++) {
      if (i === 5) break;
      if (i === this.scoreData.length - 1 || i === 4) {
        lowestWPMOnLeaderboard = this.scoreData[i].wpm;
      }

      if (i > 0) {
        if (this.scoreData[i].wpm !== this.scoreData[i-1].wpm) {
          currentRank ++;
        }
      }

      let targetSelector = `.score${i + 1}`;
      let rank = `${currentRank}`;
      let kind = newKind;
      let name = this.scoreData[i].username;
      let wpm = this.scoreData[i].wpm;
      let errors = this.scoreData[i].info.errors;

      this._renderRow(targetSelector, rank, kind, name, wpm, errors)
    }

    if (newWPM < lowestWPMOnLeaderboard) {
      let targetSelector = '.your-score';
      this._renderRow(targetSelector, `${newRank}`, newName, newWPM, newErrors);
    }
  }

  _renderRow(containerSelector, newRank, newKind, newName, newWPM, newErrors) {
    let targetContainer = Util.q(containerSelector);

    let rank = document.createElement('h4');
    rank.classList.add('table-cell');
    rank.append(`${newRank}`);

    let name = document.createElement('span');
    name.classList.add('table-cell')
    name.append(newName);

    let wpm = document.createElement('span');
    wpm.classList.add('table-cell')
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