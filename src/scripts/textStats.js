class TextStats {
  constructor(allottedTime) {
    this.numWordsTyped = 0;
    this.allottedTime = allottedTime;

    this.numWrongKeydowns = 0;
    this.missedCharCounts = {};

    // keys: what user should have typed
    // values: {k: what user actually typed, v: #times}
    this.rightCharWrongChar = {};
  }

  render(container) {
    const numMins = this.allottedTime / 60;
    const wpm = this.numWordsTyped / numMins;

    const div = document.createElement('div');

    const p1 = document.createElement('p');
    p1.append(`You typed ${this.numWordsTyped} words in ${numMins} minutes!`);

    const p2 = document.createElement('p');
    p2.append(`Typing speed: ${wpm} words/minute`);

    const p3 = document.createElement('p');
    p3.append(`Wrong keys: ${this.numWrongKeydowns}`);

    const ul = this._createRightCharWrongCharElement();
    
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(ul);
    container.appendChild(div);
  }

  setNumWordsTyped(currentSpan) {
    this.numWordsTyped = currentSpan.dataset.word;
  }

  logWrongChar(missedKey, typedKey) {
    // update numWrongKeydowns
    this._incrementNumWrongKeydowns();

    // update the counts hash
    const upcaseKey = missedKey.toUpperCase();
    if (this.missedCharCounts[upcaseKey]) {
      this.missedCharCounts[upcaseKey] ++;
    } else {
      this.missedCharCounts[upcaseKey] = 1;
    }

    // update the rightCharWrongChar hash
    if (this.rightCharWrongChar[upcaseKey]) {
      if (this.rightCharWrongChar[upcaseKey][typedKey]) {
        this.rightCharWrongChar[upcaseKey][typedKey] ++;
      } else {
        this.rightCharWrongChar[upcaseKey][typedKey] = 1
      }
    } else {
      this.rightCharWrongChar[upcaseKey] = {};
      this.rightCharWrongChar[upcaseKey][typedKey] = 1;
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
      innerP.append(`instead of ${printKey}, you typed:`)
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
          innerLi.append(`${printWrongKey}: ${value} times`);
        } else {
          innerLi.append(`${printWrongKey}: 1 time`);
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
}

export default TextStats