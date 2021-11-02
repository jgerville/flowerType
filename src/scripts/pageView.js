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
    this.addRestartButtonListener();
  }


  addStartButtonListener() {
    this.start.button.addEventListener('click', this.boundStartHandler);
  }

  async startButtonHandler (e) {
    e.preventDefault();
    this.start.button.removeEventListener('click', this.startButtonHandler);
      
    await this.start.generateText();
    this.start.container.classList.add('hidden');
    this._renderTextView(this.start.textGenerated);
  }

  _renderTextView(text) {
    const topHalf = document.querySelector('.top-half');
    
    const topHalfChildren = Array.from(topHalf.children);
    for (let i = 1; i < topHalfChildren.length; i++) {
      const child = topHalfChildren[i];
      child.classList.remove('hidden');
    }

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

  addRestartButtonListener() {
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('restart-button')) {
        PageView.resetPage();
      }
    })
  }

  static resetPage() {
    const startContainer = document.querySelector('.start-container');
    PageView._removeChildren(startContainer);
    PageView._removeHidden(startContainer);

    const timerContainer = document.querySelector('.timer-container');
    PageView._removeChildren(timerContainer);
    PageView._addHidden(timerContainer);

    const textContainer = document.querySelector('.text-container');
    PageView._removeChildren(textContainer);
    PageView._addHidden(textContainer);

    const statsContainer = document.querySelector('.stats-container');
    PageView._removeChildren(statsContainer);
    PageView._addHidden(statsContainer);

    let pageView = new PageView();
  }

  static _removeChildren(element) {
    while (element.children.length > 0) {
      element.removeChild(element.children[0]);
    }
  }

  static _removeHidden(element) {
    element.classList.remove('hidden');
  }

  static _addHidden(element) {
    element.classList.add('hidden');
  }

}

export default PageView;