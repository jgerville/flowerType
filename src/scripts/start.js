import deepai from 'deepai';

class Start {
  constructor() {
    this.container = document.querySelector('.start-container')
    this.textGenerated;

    this.render();
    this.button = document.getElementById('start-button')
    this.input = document.getElementById('sentence-input')
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
    const input = document.getElementById('sentence-input');
    const value = input.value;
    input.value = '';
    
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

export default Start;