class Laser {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.WIDTH = width;
    this.HEIGHT = height;

    const x = Math.random() * this.WIDTH;
    const y = Math.random() * this.HEIGHT;
    this.pos = [x, y];

    this.radius = 0.5;
    // this.pos = Laser.randomPosition();
    this.vel = Laser.randomVelocity();
    this.color = Laser.randomColor();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this._bounce();
  }

  _bounce() {
    if (this.pos[0] < 0) {
      this.vel[0] *= -1;
    }
    if (this.pos[0] > this.WIDTH){
      this.vel[0] *= -1;
    }
    if (this.pos[1] < 0) {
      this.vel[1] *= -1;
    }
    if (this.pos[1] > this.HEIGHT) {
      this.vel[1] *= -1;
    }
  }

  isCollidingWith(otherLaser) {
    let dist = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2));
    return (this.radius + otherLaser.radius) > dist;
  }



  static randomVelocity() {
    const degree = 2 * Math.PI * Math.random();
    return [Math.sin(degree), Math.cos(degree)];
  }

  static randomColor() {
    // Credit: Chris Coyier on CSS Tricks
    // https://css-tricks.com/snippets/javascript/random-hex-color/
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }
}

export default Laser;