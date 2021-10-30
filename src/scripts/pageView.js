import TextView from "./textView";

class PageView {
  constructor() {
    this.textView;
    this.createTextView();
  }

  createTextView() {
    const container = document.querySelector('.top-half');
    container.classList.remove('hidden')
    this.textView = new TextView;
  }

}

export default PageView;