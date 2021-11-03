class Laser {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.CANVASWIDTH = width;
    this.CANVASHEIGHT = height;

    this.radius = 3;
    this.pos = Laser.randomPosition();
    this.vel = Laser.randomVelocity();
    this.color = Laser.randomColor();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    // add something here for if it hits a border
  }

  isColliding(otherLaser) {
    let dist = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2));
    return (this.radius + otherLaser.radius) > dist;
  }

  static randomPosition() {
    const x = Math.random() * this.CANVASWIDTH;
    const y = Math.random() * this.CANVASHEIGHT;
    return [x, y];
  }

  static randomVelocity() {
    const degree = 2 * Math.PI * Math.random();
    return [Math.sin(degree), Math.cos(degree)];
  }

  static randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
  }
}