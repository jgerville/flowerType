class Petal {
  constructor(ctx, pos, color, color2, strokeColor) {
    this.ctx = ctx;
    this.startPos = pos;
    this.pos = pos;

    this.color = color;
    this.color2 = color2;
    this.strokeColor = strokeColor;

    this.initialPetalSteps = this.getRandomPetalSize();
    this.petalStepsLeft = this.initialPetalSteps;
    this.petalNotComplete = true;

    this.radius = this.getRandomRadius();

    this.degree = 0;
    this.degreeChange = this.getRandomDegreeChange();

    this.clockwise = this.getRandomBoolean();
  }

  draw() {
    if (this.petalStepsLeft > 0) {
      this.ctx.beginPath();
      this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      if (this.petalStepsLeft < this.initialPetalSteps / 3) {
        this.ctx.fillStyle = this.color2;
      } else {
        this.ctx.fillStyle = this.color;
      }
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineWidth = 1;
      this.ctx.fill();
      this.ctx.stroke();
      this.petalStepsLeft--;
    } else {
      this.petalNotComplete = false;
    }
  }

  move() {
    this.pos[0] =
      this.startPos[0] +
      5 * Math.cbrt(this.degree) * Math.sin(this.degree * this.degreeChange);
    this.pos[1] =
      this.startPos[1] +
      5 * Math.cbrt(this.degree) * Math.cos(this.degree * this.degreeChange);

    if (this.clockwise) {
      this.degree += 1;
    } else {
      this.degree -= 1;
    }
  }

  getRandomDegreeChange() {
    const nicePatterns = [1, 2, 3, 4, 5, 7, 8, 9, 10, 14, 15, 16];
    return nicePatterns[Math.floor(Math.random() * nicePatterns.length)];
  }

  getRandomRadius() {
    return Math.random() * 0.5 + 1.1;
  }

  getRandomPetalSize() {
    return Math.random() * 50 + 150;
  }

  getRandomBoolean() {
    return Math.random() >= 0.5;
  }
}

export default Petal;
