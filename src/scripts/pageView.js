import Start from "./start";
import TextView from "./textView";

class PageView {
  constructor(canvasView) {
    this.start = new Start
    this.textView;
    this.textStats;
    this.canvasView = canvasView;

    this.boundStartHandler = this.startButtonHandler.bind(this);
    this.boundStatsHandler = this.statsButtonHandler.bind(this);

    this.addStartButtonListener();
    this.addStatsButtonListener();
    this.addRestartButtonListener();
  }


  addStartButtonListener() {
    this.start.button.addEventListener('click', this.boundStartHandler);
  }

  async startButtonHandler (e) {
    e.preventDefault();
    this.start.button.removeEventListener('click', this.boundStartHandler);
    this.start.button.innerText = 'Generating, please wait...';
    this.start.button.disabled = true;
    await this.start.generateText();

    PageView._addHidden(this.start.container);
    PageView._addHidden(document.querySelector('.instructions'));
    PageView._removeHidden(document.getElementById('graphics-canvas'))
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
    this.textView = new TextView(text, this.canvasView);
    this.canvasView.start()
    this.textStats = this.textView.textStats;
  }

  addStatsButtonListener() {
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.addEventListener('click', this.boundStatsHandler)
  }

  statsButtonHandler(e) {
    e.preventDefault();
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.removeEventListener('click', this.boundStatsHandler);

    if (e.target.classList.contains('stats-button')) {
      const textContainer = document.querySelector('.text-container');
      const statsContainer = document.querySelector('.stats-container')
      textContainer.classList.add('hidden');
      this.textStats.render(statsContainer);
      statsContainer.classList.remove('hidden');
      this.textView.timer.renderRestartButton();
    }
  }

  addRestartButtonListener() {
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('restart-button')) {
        e.preventDefault();
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
    timerContainer.classList.remove('ib');
    timerContainer.classList.remove('last-twenty-seconds');
    timerContainer.classList.remove('last-ten-seconds');
    timerContainer.classList.remove('last-three-seconds');

    const textContainer = document.querySelector('.text-container');
    PageView._removeChildren(textContainer);
    PageView._addHidden(textContainer);

    const statsContainer = document.querySelector('.stats-container');
    PageView._removeChildren(statsContainer);
    PageView._addHidden(statsContainer);

    // might want to change 102-103 depending on more content
    const instructionsContainer = document.querySelector('.bottom-half');
    PageView._removeHidden(instructionsContainer);

    new PageView();
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