import Laser from "./laser";

class CanvasView {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.WIDTH = width;
    this.HEIGHT = height;
    this.lasers = [];
  }

  start() {
    const interval = setInterval(() => {
      this.moveLasers();
      this.checkCollisions();
      this.draw();
    }, 20);
    return interval;
  }

  addLaser() {
    this.lasers.push(new Laser(ctx, this.WIDTH, this.HEIGHT))
  }

  draw() {
    for (const laser of this.lasers) {
      laser.draw();
    }
  }

  moveLasers() {
    for (const laser of this.lasers) {
      laser.move();
    }
  }



  checkCollisions() {
    // for (let i = 0; i < this.lasers.length - 1; i++) {
    //   for (let j = i + 1; j < this.lasers.length; j++) {
    //     if (this.lasers[i].isCollidingWith(this.lasers[j]) {

    //     }
    //   }
    // }
    for (const laser of this.lasers) {
      // get image data of current position
      // check if it's equal to background color
      // if not, redirect
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