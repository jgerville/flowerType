import deepai from 'deepai';
// import fetch from 'node-fetch';



  // deepai.setApiKey(res)
  // debugger;

    // debugger

// async function getAPI() {
//   let response = await fetch('/api');
//   response.json()
//     .then(data => {
//       debugger;
//       console.log(data);
//     });
// }

// getAPI();



// const key = require()


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
    
      // .then(res => res.json())
      // .then((res) => {
      //   key = res.deepaiKEY;
      // })
    deepai.setApiKey(key);
    const resp = await deepai.callStandardApi("text-generator", {
            text: value,
    });
    this.textGenerated = resp.output
  }

}

export default Start;