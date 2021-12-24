import deepai from 'deepai';
import Util from './utilities';

class Start {
  constructor() {
    this.container = Util.q('.start-container')
    this.textGenerated;
    this.special = false;
    this.test = false;

    this.render();
    this.button = Util.q('#start-button');
    this.pokeButton = Util.q('#poke-button');
    this.input = Util.q('#sentence-input');
  }

  render() {
    const form = document.createElement('form');
    
    const input = document.createElement('input');
    input.id = 'sentence-input'
    input.type = 'text';
    input.placeholder = 'Type a sentence or two in here!'
    input.autofocus = true;

    const button = document.createElement('button');
    button.id = 'start-button';
    button.innerText = 'Start';

    const pokeButton = document.createElement('button');
    pokeButton.id = 'poke-button';
    pokeButton.innerText = 'Pokemon Mode (expert)';

    form.appendChild(input);
    form.appendChild(button);
    form.appendChild(pokeButton);
    this.container.appendChild(form);
    Util.q('#sentence-input').focus();
  }

  async generateText() {
    const input = Util.q('#sentence-input');
    const value = input.value;
    input.value = '';

    if (value === 'Pokemon!') {
      this.special = true;
      let response = await fetch('/special')
      let response2 = await response.json();
      let text = response2.text;
      this.textGenerated = text;
    } else if (value.slice(0, 6) === 'Test: ') {
      // the goal here is to lower timer to 30s if input begins with 'Test: '
      let response = await fetch('/api')
      let response2 = await response.json();
      let key = response2.deepaiKEY;
      deepai.setApiKey(key);
      const resp = await deepai.callStandardApi("text-generator", {
        text: value.slice(6),
      });
      this.textGenerated = resp.output;
      this.test = true;
    } else {      
      let response = await fetch('/api')
      let response2 = await response.json();
      let key = response2.deepaiKEY;
      deepai.setApiKey(key);
      const resp = await deepai.callStandardApi("text-generator", {
        text: value,
      });
      this.textGenerated = resp.output
    }
  }

}

export default Start;