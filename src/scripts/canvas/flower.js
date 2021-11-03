class Flower {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.STEMCOLORS = ['#9D9D44', '#5F923E', '#008449', '#00725E'];

    this.stemStepsLeft = this._getStemLength();
    this.stemComplete = false;
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
    if (!this.stemComplete) {
      this.drawStem();
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
      this.stemComplete = true;
      console.log('finished drawing stem')
    }
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }


  _chooseStemColor() {
    return this.STEMCOLORS[Math.floor(Math.random() * 4)]
  }

  _getStemLength() {
    return 20 + Math.floor(Math.random() * 50);
  }


  static randomVelocity() {
    const degree = ((1/3) * Math.PI * Math.random()) + ((11/6) * Math.PI);
    console.log(degree);
    return [Math.sin(degree), -Math.cos(degree)];
  }

  static randomColor() {
    // Credit: Chris Coyier on CSS Tricks
    // https://css-tricks.com/snippets/javascript/random-hex-color/
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }
}

export default Flower;