const Util = {
  q(selectorString) {
    return document.querySelector(selectorString);
  },

  getEleRemoveChildrenAddHidden(selectorString) {
    const container = document.querySelector(selectorString);
    Util.removeChildren(container);
    Util.addHidden(container);
  },

  getEleRemoveChildrenRemoveHidden(selectorString) {
    const container = document.querySelector(selectorString);
    Util.removeChildren(container);
    Util.removeHidden(container);
  },

  getEleAddHidden(selectorString) {
    const container = document.querySelector(selectorString);
    Util.addHidden(container);
  },

  getEleRemoveHidden(selectorString) {
    const container = document.querySelector(selectorString);
    Util.removeHidden(container);
  },

  resetTimerContainer() {
    const timerContainer = document.querySelector(".timer-container");
    Util.removeChildren(timerContainer);
    Util.addHidden(timerContainer);
    timerContainer.classList.remove("ib");
    timerContainer.classList.remove("last-twenty-seconds");
    timerContainer.classList.remove("last-ten-seconds");
    timerContainer.classList.remove("last-three-seconds");
  },

  removeChildren(element) {
    while (element.children.length > 0) {
      element.removeChild(element.children[0]);
    }
  },

  addHidden(element) {
    element.classList.add("hidden");
  },

  removeHidden(element) {
    element.classList.remove("hidden");
  },

  createStatCircle(number, caption) {
    const circle = document.createElement("figure");
    circle.classList.add("stat-circle");

    const num = document.createElement("span");
    num.append(`${number}`);

    const cap = document.createElement("figcaption");
    cap.append(caption);

    circle.appendChild(num);
    circle.appendChild(cap);
    return circle;
  },
};

export default Util;
