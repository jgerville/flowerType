class TextStats {
  constructor() {
    this.numWordsTyped = 0;
    this.numWrongKeydowns = 0;

    this.missedCharCounts = {};
  }

  setNumWordsTyped(currentSpan) {
    this.numWordsTyped = currentSpan.dataset.word;
  }

  incrementMissedChar(missedKey) {
    if (this.missedCharCounts[missedKey]) {
      this.missedCharCounts[missedKey] ++;
    } else {
      this.missedCharCounts[missedKey] = 1;
    }
  }
  
}

export default TextStats