class TextContent {
  constructor(body) {
    this.body = body;
    this.length = this.body.length;
    this.idx = 0;
    this.currentChar = this.body[this.idx];
  }

  // invoke if user correctly types currentChar, unless 
  nextChar() {
    if (!this.isFinished()) {
      this.idx ++;
      this.updateCurrentChar();
    }
  }

  // invoke if user presses backspace, unless idx is 0
  prevChar() {
    if (this.idx > 0) {
      this.idx --;
      this.updateCurrentChar();
    }
  }

  // invoke whenever the idx changes
  updateCurrentChar() {
    this.currentChar = this.body[this.idx];
  }

  // if the idx reaches the length, the user has gotten to the end of the text
  isFinished() {
    this.idx === this.length
  }
}

module.exports = TextContent;