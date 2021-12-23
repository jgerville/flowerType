import HighScores from "./highScores";
import Music from "./music";
import Start from "./start";
import TextView from "./textView";
import Util from "./utilities";

class PageView {
  constructor(canvasView) {
    this.start = new Start
    this.highScores = new HighScores;
    this.textView;
    this.textStats;
    this.canvasView = canvasView;
    this.canvasInterval;
    this.music;

    this.boundStartHandler = this.startButtonHandler.bind(this);
    this.boundStatsHandler = this.statsButtonHandler.bind(this);
    this.boundRestartHandler = this.restartButtonHandler.bind(this);
    // this.boundSubmitButtonListener = this.submitButtonListener.bind(this);
    // this.addSubmitButtonListener();

    this.addStartButtonListener();
    this.addStatsButtonListener();
    this.addRestartButtonListener();
    this.addMuteListeners();
    this._renderHighScores();
  }

  addStartButtonListener() {
    this.start.button.addEventListener('click', this.boundStartHandler);
  }

  async startButtonHandler (e) {
    e.preventDefault();
    this.start.button.removeEventListener('click', this.boundStartHandler);
    Util.getEleAddHidden('#sentence-input');
    this.start.button.innerText = 'Generating, please wait...';
    this.start.button.disabled = true;
    await this.start.generateText();

    Util.getEleAddHidden('.instructions');
    Util.getEleRemoveHidden('#graphics-canvas');
    const targetWPM = Number(Util.q('#wpm-input').value);

    if (this.start.special) {
      this.music = new Music('assets/special.mp3', 'egg')
      this.canvasView.mode = 'special'
    } else if (this.start.test) {
      this.music = new Music('assets/itsbab-Zachariah-Hickman.mp3', 'test');
    } else {
      this.music = new Music('assets/itsbab-Zachariah-Hickman.mp3');
    }
    
    this._renderTextView(this.start.textGenerated, targetWPM);
  }

  addMuteListeners() {
    const container = document.querySelector('.top');
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-volume-up')) {
        this.music.mute();
        Util.getEleAddHidden('#unmute')
        Util.getEleRemoveHidden('#mute')
      } else if (e.target.classList.contains('fa-volume-mute')) {
        this.music.unmute();
        Util.getEleAddHidden('#mute')
        Util.getEleRemoveHidden('#unmute')
      }
    })
  }

  _renderTextView(text, targetWPM) {
    const topHalf = Util.q('.top')
    
    const topHalfChildren = Array.from(topHalf.children);
    for (let i = 1; i < topHalfChildren.length; i++) {
      const child = topHalfChildren[i];
      child.classList.remove('hidden');
    }

    Util.getEleAddHidden('#start-container');


    const timerContainer = Util.q('.timer-container');
    timerContainer.classList.add('ib')
    this.canvasInterval = this.canvasView.start()
    this.textView = new TextView(text, this.canvasView, this.canvasInterval, this.music, targetWPM, this.highScores);
    this.textStats = this.textView.textStats;
  }

  _renderHighScores() {
    this.highScores.init();
  }

  addStatsButtonListener() {
    const timerContainer = Util.q('.timer-container');
    timerContainer.addEventListener('click', this.boundStatsHandler)
  }

  statsButtonHandler(e) {
    e.preventDefault();
    const timerContainer = Util.q('.timer-container');
    timerContainer.removeEventListener('click', this.boundStatsHandler);

    if (e.target.classList.contains('stats-button')) {
      Util.getEleAddHidden('.text-container')
      const statsContainer = Util.q('.stats-container')
      this.textStats.render(statsContainer);
      Util.removeHidden(statsContainer);

      this.music.mute();
      this.music = 0;
      Util.getEleAddHidden('#mute')
      Util.getEleAddHidden('#unmute')

      this.textView.timer.renderPostGame();
    }
  }

  addRestartButtonListener() {
    const timerContainer = Util.q('.timer-container');
    timerContainer.addEventListener('click', this.boundRestartHandler)
  }

  restartButtonHandler(e) {
    if (e.target.classList.contains('restart-button')) {
      e.preventDefault();
      const timerContainer = Util.q('.timer-container');
      timerContainer.removeEventListener('click', this.boundRestartHandler);

      this.resetPage();
    }
  }

  // addSubmitButtonListener() {
  //   const submitScoreContainer = Util.q('.submit-score-container');
  //   submitScoreContainer.addEventListener('click', this.boundSubmitButtonListener);
  // }

  // async submitButtonListener(e) {
  //   if (e.target.classList.contains('submit-score-button')) {
  //     e.preventDefault();
  //     const submitScoreInput = Util.q('.submit-score-input');
  //     if (submitScoreInput.value) {
  //       const submitScoreButton = Util.q('.submit-score-button');
  //       submitScoreButton.innerText = 'Uploading, please wait...';
  //       submitScoreButton.disabled = true;
  //       const username = submitScoreInput.value
  //       const wpm = this.textStats.getWPM();
  //       const errors = this.textStats.getErrors();
  //       try {
  //         await this.highScores.postScore(username, wpm, errors);
  //         submitScoreButton.innerText = 'Submitted!'
  //         const submitScoreContainer = Util.q('.submit-score-container');
  //         submitScoreContainer.removeEventListener('click', this.boundSubmitButtonListener);
  //       } catch (error) {
  //         this._addErrorToSubmitScore('Looks like something went wrong. Please try again!');
  //         submitScoreButton.innerText = 'Submit';
  //         submitScoreButton.disabled = false;
  //       }
  //     } else {
  //       this._addErrorToSubmitScore('Make sure to enter a name before submitting!')
  //     }
  //   }
  // }

  // _addErrorToSubmitScore(errorText) {
  //   const submitScoreError = Util.q('submit-score-error');
  //   if (submitScoreError.children.length > 0) {
  //     for (const child of submitScoreError.children) {
  //       submitScoreError.removeChild(child)
  //     }
  //   }
  //   submitScoreError.append(errorText);
  // }

  resetPage() {
    Util.getEleRemoveChildrenRemoveHidden('.start-container');
    Util.resetTimerContainer();
    Util.getEleRemoveChildrenAddHidden('.text-container');
    Util.getEleRemoveChildrenAddHidden('.stats-container');
    Util.getEleRemoveHidden('.instructions')
    Util.getEleAddHidden('#graphics-canvas')

    this.canvasView.clearCanvas();
    new PageView(this.canvasView);
  }
}

export default PageView;