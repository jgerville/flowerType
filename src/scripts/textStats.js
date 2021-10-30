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
    const upcaseKey = missedKey.toUpperCase();
    if (this.missedCharCounts[upcaseKey]) {
      this.missedCharCounts[upcaseKey] ++;
    } else {
      this.missedCharCounts[upcaseKey] = 1;
    }
  }

  incrementNumWrongKeydowns() {
    this.numWrongKeydowns ++;
  }
  
}

export default TextStats