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