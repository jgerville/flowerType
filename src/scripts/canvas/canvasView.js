import Flower from "./flower";
import Laser from "./laser";

class CanvasView {
  constructor(ctx, width, height) {
  // once mode selection exists, add mode param
    this.ctx = ctx
    this.WIDTH = width;
    this.HEIGHT = height;
    this.lasers = [];
    this.flowers = [];
  }

  start() {
    const interval = setInterval(() => {
      this.moveFlowers();
      this.draw();
    }, 20);
    return interval;
  }

  // once mode selection exists, refactor to addObject
  addLaser() {
    this.lasers.push(new Laser(ctx, this.WIDTH, this.HEIGHT))
  }

  addFlower() {
    this.flowers.push(new Flower(ctx, this.WIDTH, this.HEIGHT))
  }

  draw() {
    for (const laser of this.lasers) {
      laser.draw();
    }
    for (const flower of this.flowers) {
      flower.draw();
    }
  }

  moveLasers() {
    for (const laser of this.lasers) {
      laser.move();
    }
  }

  moveFlowers() {
    for (const flower of this.flowers) {
      flower.move();
    }
  }


  clearInt(intervalID) {
    clearInterval(intervalID);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.lasers = [];
  }

  
}

export default CanvasView;