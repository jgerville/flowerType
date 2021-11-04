import CanvasView from "./scripts/canvas/canvasView";
import PageView from "./scripts/pageView";


const canvasEl = document.getElementById("graphics-canvas");
const canvasParent = document.querySelector(".bottom-half");
const rect = canvasParent.getBoundingClientRect();

const ctxX = rect.width - 4;
const ctxY = rect.height - 4;

canvasEl.width = ctxX;
canvasEl.height = ctxY;

const ctx = canvasEl.getContext("2d");

let canvasView = new CanvasView(ctx, ctxX, ctxY);
new PageView(canvasView);