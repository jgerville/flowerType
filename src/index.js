import CanvasView from "./scripts/canvas/canvasView";
import PageView from "./scripts/pageView";


const canvasEl = document.getElementById("graphics-canvas");
const canvasParent = document.querySelector(".bottom-half");
const ctxX = canvasParent.offsetWidth - 4;
const ctxY = canvasParent.offsetHeight - 4;
canvasEl.width = ctxX;
canvasEl.height = ctxY;
const ctx = canvasEl.getContext("2d");
window.ctx = ctx;

let canvasView = new CanvasView(ctx, ctxX, ctxY);
let pageView = new PageView(canvasView);


// this is for testing stuff in the console
window.pv = pageView;
window.start = pageView.start

window.canv = canvasView;
window.af = canvasView.addFlower();
// canvasView.addFlower();
// canvasView.addFlower();
// canvasView.addFlower();
window.start = canvasView.start();

function setUpCanvas() {

}