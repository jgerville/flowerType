class TextContent {
  constructor(body) {
    this.body = this.makeTypeable(body);
    this.length = this.body.length;
    this.idx = 0;
    this.currentChar = this.body[this.idx];
  }

  // invoke if user correctly types currentChar, unless 
  nextChar() {
    this.idx ++;
    this.updateCurrentChar();
  }

  makeTypeable(body) {
    let multiplied = body;
    for (let i = 0; i < 3; i++) {
      multiplied = multiplied + " " + body;
    }
    multiplied = multiplied.replace(/…/g, "...");
    multiplied = multiplied.replace(/é/g, "e");
    multiplied = multiplied.replace(/–/g, "-");
    return multiplied.replace(/\s{2,}/g, " ");
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