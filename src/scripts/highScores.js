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
    const scoresArray = data.Items;
    this.scoreData = scoresArray;
    return scoresArray;
  }

  async postScore(kind = "normal", name, wpm, errors) {
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
    this._render(wpm);
    const rank = scoresArray.findIndex((score) => score.wpm == wpm); 
    return rank;
  }

  _render(newWpm) {
    for (let i = 0; i < this.scoreData.length; i++) {
      if (i === 5) break;

      let targetContainer = Util.q(`.score${i + 1}`);

      let rank = document.createElement('h4');
      rank.classList.add('table-cell');
      rank.append(`${i + 1}`);

      let name = document.createElement('span');
      name.classList.add('table-cell')
      name.append(this.scoreData[i].info.name);

      let wpm = document.createElement('span');
      wpm.classList.add('table-cell')
      wpm.append(this.scoreData[i].wpm);

      let errors = document.createElement('span');
      errors.classList.add('table-cell')
      errors.append(this.scoreData[i].info.errors);

      targetContainer.append(rank);
      targetContainer.append(name);
      targetContainer.append(wpm);
      targetContainer.append(errors);
    }
  }
}

export default HighScores;