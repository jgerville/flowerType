import Util from "./utilities";

class Modal {
  constructor() {
    this.boundClose = this.close.bind(this);
  }

  open() {
    const outer = document.createElement("div");
    outer.classList.add("outer-modal");

    const inner = document.createElement("div");
    inner.classList.add("inner-modal");

    const header = document.createElement("div");
    header.classList.add("modal-header");

    const tech = document.createElement("div");
    tech.classList.add("tech");

    const technical = document.createElement("h3");
    technical.append("Technical Details");
    const technicalP = document.createElement("p");
    technicalP.append(
      "I wanted to create something in pure vanilla JavaScript without the assistance of any libraries or frameworks wherever possible. So, that's what this is! I used JS for the frontend, and Node / Express for the backend. I also took this opportunity to get experience using DynamoDB for the leaderboard component."
    );
    tech.appendChild(technical);
    tech.appendChild(technicalP);

    const norm = document.createElement("div");
    norm.classList.add("norm");

    const normal = document.createElement("h3");
    normal.append("How it works");
    const normalP = document.createElement("p");
    normalP.append(
      "In Normal Mode, you write out a sentence about anything you want. That sentence then gets fed into DeepAI's API, which then generates what it thinks is a relevant block of text."
    );
    const normalP2 = document.createElement("p");
    normalP2.append(
      "Thanks to the AI, your typing test can be about anything you want! If you put in some lines of code, you'll get back many other lines of code."
    );
    norm.appendChild(normal);
    norm.appendChild(normalP);
    norm.appendChild(normalP2);

    const times = document.createElement("i");
    times.classList.add("fas");
    times.classList.add("fa-times-circle");

    const container = Util.q(".modal-holder");

    // inner.appendChild(header);
    inner.appendChild(times);
    inner.appendChild(norm);
    inner.appendChild(tech);
    // inner.appendChild(pok);

    container.appendChild(outer);
    container.appendChild(inner);
    this.addCloseListener();
  }

  close() {
    Util.removeChildren(Util.q(".modal-holder"));
  }

  addCloseListener() {
    Util.q(".fa-times-circle").addEventListener("click", this.boundClose);
  }
}

export default Modal;
