import Flower from "./flower";
import Laser from "./laser";
import Thing from "./thing";

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
    window.things = this.things;
  }

  start() {
    const interval = setInterval(() => {
      this.moveObjects();
      this.draw();
    }, 20);
    return interval;
  }

  draw() {
    if (this.mode === 'lasers') {
      for (const laser of this.lasers) {
        laser.draw();
      }
    } else if (this.mode === 'special') {
      this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      for (const thing of this.things) {
        thing.draw();
      }
    } else {
      for (const flower of this.flowers) {
        flower.draw();
      }
    }
  }

  addObject() {
    if (this.mode === 'lasers') {
      this.addLaser();
    } else if (this.mode === 'special') {
      this.addThing();
    } else {
      this.addFlower();
    }
  }
  
  addLaser() {
    this.lasers.push(new Laser(this.ctx, this.WIDTH, this.HEIGHT))
  }

  addFlower() {
    this.flowers.push(new Flower(this.ctx, this.WIDTH, this.HEIGHT))
  }

  addThing() {
    this.things.push(new Thing(this.ctx, this.WIDTH, this.HEIGHT))
  }

  moveObjects() {
    if (this.mode === 'lasers') {
      this.moveLasers();
    } else if (this.mode === 'special') {
      this.moveThings();
    } else {
      this.moveFlowers();
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

  moveThings() {
    for (const thing of this.things) {
      thing.move();
    }
  }


  clearInt(intervalID) {
    clearInterval(intervalID);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.lasers = [];
    this.flowers = [];
    this.things = [];
  }

  
}

export default CanvasView;