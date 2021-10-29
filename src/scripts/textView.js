const TextContent = require("./textContent");


class TextView {
  constructor(textContent) {
    this.CATIPSUM = `Cat ipsum dolor sit amet, put butt in owner's face poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree floof tum, tickle bum, jellybean footies curly toes destroy couch as revenge. Catching very fast laser pointer grass smells good cat slap dog in face. Ooooh feather moving feather! cereal boxes make for five star accommodation . Cuddle no cuddle cuddle love scratch scratch kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment slap owner's face at 5am until human fills food dish refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am but scratch so kitty kitty pussy cat doll. Intently stare at the same spot kick up litter for cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers this is the day . Pet my belly, you know you want to; seize the hand and shred it! knock over christmas tree. And sometimes switches in french and say 'miaou' just because well why not so you're just gonna scroll by without saying meowdy?`
    this.IGNOREDKEYS = ["Tab", "Backspace", "Delete", "Shift", "Escape", "Alt", "CapsLock", "Control", "Fn", "FnLock", "Meta", "NumLock", "ScrollLock", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "End", "Home", "PageDown", "PageUp"]
    this.textContent = new TextContent(this.CATIPSUM);
    this.num_wrong_keydowns = 0;
    this.renderText();
    // this.displayedIdx = 0;
    this.addBindings();
  }

  renderText() {
    const container = document.querySelector('.text-container');
    const p = document.createElement('p');
    p.innerText = this.textContent.body;
    container.appendChild(p);
  }

  addBindings() {
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      console.log(key);
      if (this._ismatch(key)) {
        this.correctChar();
      } else if (this._isIgnoredKey(key)) {
        console.log("Looks like an ignored key was pressed.")
      } else {
        this.wrongChar();
      }
    })
  }

  correctChar() {
    this.textContent.nextChar();
    this.nextDisplayedIdx();
    console.log(`matched! next up is ${this.textContent.currentChar}`)
  }

  wrongChar() {
    // this.nextDisplayedIdx();
    this.num_wrong_keydowns ++;
    console.log(`Wrong entry. the next char is: ${this.textContent.currentChar}`)
  }

  // nextDisplayedIdx() {

  // }

  // prevDisplayedIdx() {

  // }

  // backspace() {

  // }

  // _isBackspace(key) {
  //   return key === "Backspace";
  // }

  _ismatch(key) {
    return this.textContent.isMatch(key);
  }
  
  _isIgnoredKey(key) {
    return this.IGNOREDKEYS.indexOf(key) >= 0;
  }
}

module.exports = TextView;