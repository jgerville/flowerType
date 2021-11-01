import TextView from "./textView";

class PageView {
  constructor() {
    this.textView;
    this.createTextView();
    this.textStats = this.textView.textStats;

    this.addStatsButtonListener();
  }

  createTextView() {
    const container = document.querySelector('.top-half');
    container.classList.remove('hidden');
    this.textView = new TextView;
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