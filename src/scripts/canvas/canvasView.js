import Laser from "./laser";

class CanvasView {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.WIDTH = width;
    this.HEIGHT = height;
    this.lasers = [];
  }

  start() {
    setInterval(() => {
      this.moveLasers();
      this.draw();
    }, 20);
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
}

export default CanvasView;