class Petal {
  constructor(ctx, pos, color) {
    this.ctx = ctx;
    this.pos = pos;
    this.color = color;
    this.petalStepsLeft = 200;
    this.petalNotComplete = true;

    this.radius = 0.5;
    this.degree = 0;
    this.vel = this.convertToVelocity(this.degree);
  }

  draw() {
    if (this.petalStepsLeft > 0) {
      this.ctx.beginPath();
      this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.petalStepsLeft --;
    } else {
      this.petalNotComplete = false;
      console.log('finished drawing petal');
    }
  }

  move() {
    // debugger
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.updateVelocity()
  }

  updateVelocity() {
    this.degree += 0.5;
    this.vel = this.convertToVelocity(this.degree);
  }

  convertToVelocity(degree) {
    return [Math.sin(degree), Math.cos(degree)]
  }
}

export default Petal;