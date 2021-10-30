class TextStats {
  constructor() {
    this.numWordsTyped = 0;
    this.numWrongKeydowns = 0;

    this.missedCharCounts = {};

    // keys: what user should have typed
    // values: {k: what user actually typed, v: #times}
    this.rightCharWrongChar = {};
  }

  setNumWordsTyped(currentSpan) {
    this.numWordsTyped = currentSpan.dataset.word;
  }

  logWrongChar(missedKey, typedKey) {
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
      this.rightCharWrongChar[upcaseKey] = {typedKey: 1}
    }
  }

  incrementNumWrongKeydowns() {
    this.numWrongKeydowns ++;
  }
  
  

}

export default TextStats