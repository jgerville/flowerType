import Flower from "./flower";
import Laser from "./laser";

class CanvasView {
  constructor(ctx, width, height) {
  // once mode selection exists, add mode param
    this.ctx = ctx
    this.WIDTH = width;
    this.HEIGHT = height;
    this.mode;

    this.lasers = [];
    this.flowers = [];
    this.things = [];
  }

  start() {
    const interval = setInterval(() => {
      this.moveFlowers();
      this.draw();
    }, 20);
    return interval;
  }

  draw() {
    for (const laser of this.lasers) {
      laser.draw();
    }
    for (const flower of this.flowers) {
      flower.draw();
    }
  }

  addObject() {
    if (this.mode === 'lasers') {
      this.addLaser();
    } else if (this.mode === 'special') {
      // this.addThing();
    } else {
      this.addFlower();
    }
  }
  
  // once mode selection exists, refactor to addObject
  addLaser() {
    this.lasers.push(new Laser(this.ctx, this.WIDTH, this.HEIGHT))
  }

  addFlower() {
    this.flowers.push(new Flower(this.ctx, this.WIDTH, this.HEIGHT))
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
    this.flowers = [];
  }

  
}

export default CanvasView;