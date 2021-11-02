class Laser {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.eleWidth = width;
    this.eleHeight = height;

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
  }

  static randomPosition() {
    const x = Math.random() * this.eleWidth;
    const y = Math.random() * this.eleHeight;
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