import Start from "./start";
import TextView from "./textView";

class PageView {
  constructor() {
    this.start = new Start
    this.textView;
    this.textStats;

    this.boundStartHandler = this.startButtonHandler.bind(this);

    this.addStartButtonListener();
    this.addStatsButtonListener();
  }


  addStartButtonListener() {
    this.start.button.addEventListener('click', this.boundStartHandler);
  }

  async startButtonHandler (e) {
    e.preventDefault();
    this.start.button.removeEventListener('click', this.startButtonHandler);
      
    await this.start.generateText();
    console.log(this.start.container);
    console.log(this.start.container.classList);
    this.start.container.classList.add('hidden');
    this._renderTextView(this.start.textGenerated);
  }

  _renderTextView(text) {
    const topHalf = document.querySelector('.top-half');
    // THIS IS WHERE I'M UNHIDING IT
    for (const child of topHalf.children) {
      child.classList.remove('hidden');
    }
    // FIX THIS TOMORROW
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.classList.add('ib')
    this.textView = new TextView(text);
    this.textStats = this.textView.textStats;
  }

  addStatsButtonListener() {
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('stats-button')) {
        const textContainer = document.querySelector('.text-container');
        const statsContainer = document.querySelector('.stats-container')
        textContainer.classList.add('hidden');
        this.textStats.render(statsContainer);
        statsContainer.classList.remove('hidden');
      }
    })
  }

}

export default PageView;