import Petal from "./petal";

class Flower {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.STEMCOLORS = ['#9D9D44', '#5F923E', '#008449', '#00725E'];

    this.stemStepsLeft = this._getStemLength();
    this.stemNotComplete = true;
    this.petals = [];

    const x = Math.random() * this.WIDTH;
    const y = this.HEIGHT;
    this.pos = [x, y];

    this.radius = 0.5;
    // this.pos = Laser.randomPosition();
    this.vel = Flower.randomVelocity();
    this.stemColor = this._chooseStemColor();
    this.petalColor = Flower.randomColor();
  }

  draw() {
    if (this.stemNotComplete) {
      this.drawStem();
    } else {
      if (this.petals.length === 0) {
        this.petals.push(new Petal(this.ctx, this.pos, this.petalColor));
      }
      if (this.petals[0].petalNotComplete) {
        this.petals[0].draw();
      }
    }
  }

  drawStem() {
    if (this.stemStepsLeft > 0) {
      this.ctx.beginPath();
      this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.stemColor;
      this.ctx.fill();
      this.stemStepsLeft --;
    } else {
      this.stemNotComplete = false;
    }
  }

  move() {
    if (this.stemNotComplete) {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }

    if (this.petals.length > 0) {
      if (this.petals[0].petalNotComplete) {
        this.petals[0].move();
      }
    }
  }


  _chooseStemColor() {
    return this.STEMCOLORS[Math.floor(Math.random() * 4)]
  }

  _getStemLength() {
    return 20 + Math.floor(Math.random() * 200);
  }


  static randomVelocity() {
    const degree = ((1/3) * Math.PI * Math.random()) + ((11/6) * Math.PI);
    return [Math.sin(degree), -Math.cos(degree)];
  }

  static randomColor() {
    // Credit: Chris Coyier on CSS Tricks
    // https://css-tricks.com/snippets/javascript/random-hex-color/
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }
}

export default Flower;