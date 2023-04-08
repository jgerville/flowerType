class Thing {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.POSSIBLEIMGS = [
      "./assets/pkch.png",
      "./assets/ddn.png",
      "./assets/eve.png",
      "./assets/mmk.png",
      "./assets/wem.png",
    ];
    this.source = this._chooseImg();

    const x = Math.random() * this.WIDTH;
    const y = Math.random() * this.HEIGHT;
    this.pos = [x, y];

    this.vel = Thing.randomVelocity();
  }

  draw() {
    const image = new Image();
    image.src = this.source;
    // this.ctx.save();
    // this.ctx.translate(this.pos[0], this.pos[1]);
    // this.ctx.rotate(10*Math.PI/180);
    this.ctx.drawImage(image, this.pos[0], this.pos[1]);
    // this.ctx.restore();
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
    if (this.pos[0] > this.WIDTH) {
      this.vel[0] *= -1;
    }
    if (this.pos[1] < 0) {
      this.vel[1] *= -1;
    }
    if (this.pos[1] > this.HEIGHT) {
      this.vel[1] *= -1;
    }
  }

  _chooseImg() {
    const rand = Math.random();
    if (rand >= 0.15) {
      return this.POSSIBLEIMGS[0];
    } else if (rand >= 0.09) {
      return this.POSSIBLEIMGS[1];
    } else if (rand >= 0.04) {
      return this.POSSIBLEIMGS[2];
    } else if (rand >= 0.01) {
      return this.POSSIBLEIMGS[3];
    } else {
      return this.POSSIBLEIMGS[4];
    }
  }

  static randomVelocity() {
    const degree = (1 / 3) * Math.PI * Math.random() + (11 / 6) * Math.PI;
    return [Math.sin(degree), -Math.cos(degree)];
  }
}

export default Thing;
