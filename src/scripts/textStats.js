import Util from "./utilities";

class TextStats {
  constructor(allottedTime, targetWPM, highScores) {
    this.numWordsTyped = 0;
    this.allottedTime = allottedTime;
    this.targetWPM = targetWPM;
    this.highScores = highScores;

    this.numWrongKeydowns = 0;
    this.missedCharCounts = {};

    // keys: what user should have typed
    // values: {k: what user actually typed, v: #times}
    this.rightCharWrongChar = {};

    this.boundSubmitButtonListener = this.submitButtonListener.bind(this);
  }

  addSubmitButtonListener() {
    const submitScoreContainer = Util.q('.submit-score-container');
    submitScoreContainer.addEventListener('click', this.boundSubmitButtonListener);
  }

  async submitButtonListener(e) {
    if (e.target.classList.contains('submit-score-button')) {
      e.preventDefault();
      const submitScoreInput = Util.q('.submit-score-input');
      if (submitScoreInput.value) {
        const submitScoreError = Util.q('.submit-score-error');
        Util.removeChildren(submitScoreError);
        
        const submitScoreButton = Util.q('.submit-score-button');
        submitScoreButton.innerText = 'Uploading, please wait...';
        submitScoreButton.disabled = true;
        const username = submitScoreInput.value
        const wpm = this.getWPM();
        const errors = this.getErrors();

        try {
          await this.highScores.postScore(username, wpm, errors);
          submitScoreButton.innerText = 'Submitted!'
          const submitScoreContainer = Util.q('.submit-score-container');
          submitScoreContainer.removeEventListener('click', this.boundSubmitButtonListener);
        } catch (error) {
          this._addErrorToSubmitScore('Looks like something went wrong. Please try again!');
          submitScoreButton.innerText = 'Submit';
          submitScoreButton.disabled = false;
        }
      } else {
        this._addErrorToSubmitScore('Make sure to enter a name before submitting!')
      }
    }
  }

  _addErrorToSubmitScore(errorText) {
    const submitScoreError = Util.q('.submit-score-error');
    Util.removeChildren(submitScoreError);
    const p = document.createElement('p');
    p.append(errorText);
    submitScoreError.appendChild(p);
  }

  render(container) {
    const numMins = this.allottedTime / 60;
    const wpm = this.getWPM();

    const div = document.createElement('div');
    div.classList.add('stats');

    const p1 = document.createElement('p');
    if (numMins === 1) {
      p1.append(`You typed ${this.numWordsTyped} words in ${numMins} minute!`);
    } else {
      p1.append(`You typed ${this.numWordsTyped} words in ${numMins} minutes!`);
    }

    const p2 = document.createElement('p');
    p2.append(`Typing speed: ${wpm} words/minute`);

    const p3 = document.createElement('p');
    p3.append(`Wrong keys: ${this.numWrongKeydowns}`);

    // const ul = this._createRightCharWrongCharElement();
    
    // div.appendChild(p1);
    // div.appendChild(p2);
    // div.appendChild(p3);

    // div.appendChild(ul);

    const { wpmCircle, errorCircle } = this._createStatCircles(wpm, this.numWrongKeydowns);
    div.appendChild(wpmCircle);
    div.appendChild(errorCircle);

    const submitScoreContainer = document.createElement('div');
    submitScoreContainer.classList.add('submit-score-container');

    const inputRow = document.createElement('form');
    inputRow.classList.add('input-row');

    const submitScoreInput = document.createElement('input');
    submitScoreInput.classList.add('submit-score-input');
    submitScoreInput.placeholder = 'Your Name';

    const submitScoreError = document.createElement('div');
    submitScoreError.classList.add('submit-score-error');

    const submitScoreButton = document.createElement('button');
    submitScoreButton.classList.add('submit-score-button');
    submitScoreButton.append('Submit');
    submitScoreButton.disabled = true;

    inputRow.appendChild(submitScoreInput);
    inputRow.appendChild(submitScoreButton);

    submitScoreContainer.appendChild(submitScoreError);
    submitScoreContainer.appendChild(inputRow);


    container.appendChild(div);
    container.appendChild(submitScoreContainer);
    Util.q('.submit-score-input').addEventListener('input', this.handleInput);
    this.addSubmitButtonListener();
  }

  handleInput(e) {
    const button = Util.q('.submit-score-button');
    if (e.target.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

  getWPM() {
    const numMins = this.allottedTime / 60;
    return this.numWordsTyped / numMins;
  }

  getErrors() {
    return this.numWrongKeydowns;
  }

  setNumWordsTyped(currentSpan) {
    this.numWordsTyped = currentSpan.dataset.word;
  }

  logWrongChar(missedKey, typedKey) {
    // update numWrongKeydowns
    this._incrementNumWrongKeydowns();

    // update the counts hash
    const upcaseKey = missedKey.toUpperCase();
    const upcaseTypedKey = typedKey.toUpperCase();

    if (this.missedCharCounts[upcaseKey]) {
      this.missedCharCounts[upcaseKey] ++;
    } else {
      this.missedCharCounts[upcaseKey] = 1;
    }

    // update the rightCharWrongChar hash
    if (this.rightCharWrongChar[upcaseKey]) {
      if (this.rightCharWrongChar[upcaseKey][upcaseTypedKey]) {
        this.rightCharWrongChar[upcaseKey][upcaseTypedKey] ++;
      } else {
        this.rightCharWrongChar[upcaseKey][upcaseTypedKey] = 1
      }
    } else {
      this.rightCharWrongChar[upcaseKey] = {};
      this.rightCharWrongChar[upcaseKey][upcaseTypedKey] = 1;
    }
  }

  _createRightCharWrongCharElement() {
    const ul = document.createElement('ul');
    for (const key in this.rightCharWrongChar) {
      // structure: li>p,ul>li, li, li
      const li = document.createElement('li');


      const innerP = document.createElement('p');
      let printKey = key;
      if (printKey === " ") {
        printKey = "Space";
      }
      innerP.append(`instead of ${printKey} , you typed:`)
      li.appendChild(innerP);
      
      const innerUl = document.createElement('ul');
      for (const wrongKey in this.rightCharWrongChar[key]) {
        const innerLi = document.createElement('li');
        const value = this.rightCharWrongChar[key][wrongKey]
        let printWrongKey = wrongKey.toUpperCase();
        if (printWrongKey === " ") {
          printWrongKey = "Space";
        }
        if (value > 1) {
          innerLi.append(`${printWrongKey} : ${value} times`);
        } else {
          innerLi.append(`${printWrongKey} : 1 time`);
        }
        innerUl.appendChild(innerLi);
      }
      li.appendChild(innerUl);
      ul.appendChild(li);
    }
    return ul;
  }

  _incrementNumWrongKeydowns() {
    this.numWrongKeydowns ++;
  }

  _createStatCircles(wpm, numErrors) {
    const wpmCircle = Util.createStatCircle(wpm, 'WPM');
    const errorCircle = Util.createStatCircle(numErrors, 'errors');
    return { wpmCircle, errorCircle };
  }
}

export default TextStats