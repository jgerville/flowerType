import PageView from "./scripts/pageView";

let pageView = new PageView();

const canvasEl = document.getElementById("graphics-canvas");
const canvasParent = document.querySelector(".bottom-half");
canvasEl.width = canvasParent.offsetWidth - 4;
canvasEl.height = canvasParent.offsetHeight - 4;
const ctx = canvasEl.getContext("2d");
window.ctx = ctx;


// this is for testing stuff in the console
window.pv = pageView;
window.start = pageView.start