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

    const titleDiv = document.createElement('div');
    const title = document.createElement('h2');
    title.append('Flower Type');
    const tagline = document.createElement('p');
    const em = document.createElement('em');
    em.append('An AI-Generated Typing Test');
    tagline.appendChild(em);
    titleDiv.appendChild(title);
    titleDiv.appendChild(tagline);
    
    const input = document.createElement('input');
    input.id = 'sentence-input'
    input.type = 'text';
    input.placeholder = 'Type a sentence or two in here!'
    input.classList.add('disabled');

    const button = document.createElement('button');
    button.id = 'start-button';
    button.innerText = 'Start';
    button.disabled = true;

    const pokeButton = document.createElement('button');
    pokeButton.id = 'poke-button';
    pokeButton.innerText = 'Pokemon Mode (expert)';

    form.appendChild(input);
    form.appendChild(button);
    form.appendChild(pokeButton);

    this.container.appendChild(titleDiv);
    this.container.appendChild(form);
    Util.q('#sentence-input').focus();
    Util.q('#sentence-input').addEventListener('input', this.handleInput);
  }

  handleInput(e) {
    const button = Util.q('#start-button');
    if (e.target.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

  async generateText() {
    const input = Util.q('#sentence-input');
    const value = input.value;
    input.value = '';

    if (value === 'Pokemon!') {
      this.special = true;
      // The text we generate in this case is hardcoded, but it's intentionally
      // obscured here to make the surprise better.
      const specialTextResponse = await fetch('/special');
      const specialTextData = await specialTextResponse.json();
      this.textGenerated = specialTextData.text;
    } else {
      let inputText;
      if (value.slice(0, 6) === 'Test: ') {
        this.test = true;
        inputText = value.slice(6);
      } else {
        inputText = value;
      }

      const apiKeyResponse = await fetch('/api');
      const apiKeyData = await apiKeyResponse.json();
      deepai.setApiKey(apiKeyData.deepaiKEY);
      const generatedResponse = await deepai.callStandardApi("text-generator", {
        text: inputText,
      });
      this.textGenerated = generatedResponse.output;
    }
  }

}

export default Start;