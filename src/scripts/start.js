import deepai from 'deepai';
import Util from './utilities';

class Start {
  constructor() {
    this.container = Util.q('.start-container')
    this.textGenerated;
    this.special = false;
    this.test = false;

    this.render();
    this.button = Util.q('#start-button')
    this.input = Util.q('#sentence-input')
  }

  render() {
    const input = document.createElement('input');
    input.id = 'sentence-input'
    input.type = 'text';
    input.placeholder = 'Type a sentence or two in here!'
    this.container.appendChild(input);

    const button = document.createElement('button');
    button.id = 'start-button'
    button.innerText = 'Start';
    this.container.appendChild(button);
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