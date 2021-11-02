class TextContent {
  constructor(body) {
    this.body = this.chompNewLines(body);
    this.length = this.body.length;
    this.idx = 0;
    this.currentChar = this.body[this.idx];
  }

  // invoke if user correctly types currentChar, unless 
  nextChar() {
    if (!this.isFinished()) {
      this.idx ++;
      this.updateCurrentChar();
    } else {
      console.log("Can't go forward cause finished.")
    }
  }

  chompNewLines(body) {
    console.log(body)
    return body.replace(/\s{2,}/g, " ");
  }

  isMatch(key) {
    return key == this.currentChar;
  }

  // invoke whenever the idx changes
  updateCurrentChar() {
    this.currentChar = this.body[this.idx];
  }

  // if the idx reaches the length, the user has gotten to the end of the text
  isFinished() {
    return this.idx === this.length
  }
}

export default TextContent;