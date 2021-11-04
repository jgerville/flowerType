import Music from "./music";
import Start from "./start";
import TextView from "./textView";

class PageView {
  constructor(canvasView) {
    this.start = new Start
    this.textView;
    this.textStats;
    this.canvasView = canvasView;
    this.canvasInterval;
    this.music;

    this.boundStartHandler = this.startButtonHandler.bind(this);
    this.boundStatsHandler = this.statsButtonHandler.bind(this);
    this.boundRestartHandler = this.restartButtonHandler.bind(this);

    this.addStartButtonListener();
    this.addStatsButtonListener();
    this.addRestartButtonListener();
    this.addMuteListeners();
  }

  addStartButtonListener() {
    this.start.button.addEventListener('click', this.boundStartHandler);
  }

  async startButtonHandler (e) {
    e.preventDefault();
    this.start.button.removeEventListener('click', this.boundStartHandler);
    document.getElementById('sentence-input').classList.add('hidden')
    this.start.button.innerText = 'Generating, please wait...';
    this.start.button.disabled = true;
    await this.start.generateText();

    PageView._addHidden(document.querySelector('.instructions'));
    PageView._removeHidden(document.getElementById('graphics-canvas'));

    this.music = new Music('itsbab-Zachariah-Hickman.mp3');
    
    this._renderTextView(this.start.textGenerated);
  }

  addMuteListeners() {
    const container = document.querySelector('.top-half');
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-volume-up')) {
        this.music.mute();
        document.getElementById('unmute').classList.add('hidden');
        document.getElementById('mute').classList.remove('hidden');
      } else if (e.target.classList.contains('fa-volume-mute')) {
        this.music.unmute();
        document.getElementById('mute').classList.add('hidden');
        document.getElementById('unmute').classList.remove('hidden');
      }
    })
  }

  _renderTextView(text) {
    const topHalf = document.querySelector('.top-half');
    
    const topHalfChildren = Array.from(topHalf.children);
    for (let i = 1; i < topHalfChildren.length; i++) {
      const child = topHalfChildren[i];
      child.classList.remove('hidden');
    }

    PageView._addHidden(document.getElementById('start-container'));


    const timerContainer = document.querySelector('.timer-container');
    timerContainer.classList.add('ib')
    this.canvasInterval = this.canvasView.start()
    this.textView = new TextView(text, this.canvasView, this.canvasInterval, this.music);
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

      this.music.mute();
      this.music = 0;
      document.getElementById('mute').classList.add('hidden');
      document.getElementById('unmute').classList.add('hidden');

      this.textView.timer.renderRestartButton();
    }
  }

  addRestartButtonListener() {
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.addEventListener('click', this.boundRestartHandler)
  }

  restartButtonHandler(e) {
    if (e.target.classList.contains('restart-button')) {
      e.preventDefault();
      const timerContainer = document.querySelector('.timer-container');
      timerContainer.removeEventListener('click', this.boundRestartHandler);

      this.resetPage();
    }
  }

  resetPage() {
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

    const instructionsContainer = document.querySelector('.instructions');
    PageView._removeHidden(instructionsContainer);

    PageView._addHidden(document.getElementById('graphics-canvas'))

    this.canvasView.clearCanvas();
    new PageView(this.canvasView);
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