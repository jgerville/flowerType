class Petal {
  constructor(ctx, pos, color) {
    this.ctx = ctx;
    this.pos = pos;
    this.color = color;
    this.petalStepsLeft = this.getRandomPetalSize();
    this.petalNotComplete = true;

    this.radius = this.getRandomRadius();
    this.degree = 0;

    this.growthFactor = this.getRandomGrowthFactor();
  }

  draw() {
    if (this.petalStepsLeft > 0) {
      this.ctx.beginPath();
      this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.petalStepsLeft --;
    } else {
      this.petalNotComplete = false;
    }
  }

  move() {
    this.pos[0] += this.growthFactor * Math.sin(this.degree);
    this.pos[1] += this.growthFactor * Math.cos(this.degree);
    this.degree += 1;
    this.growthFactor += 0.1
  }

  getRandomGrowthFactor() {
    return (Math.random() * 0.2) + 0.1
  }

  getRandomRadius() {
    return (Math.random() * 0.5) + 0.5
  }

  getRandomPetalSize() {
    return (Math.random() * 200) + 50
  }
}

export default Petal;