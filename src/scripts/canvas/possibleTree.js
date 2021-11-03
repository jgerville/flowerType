// class Petal {
//   constructor(ctx, pos, color, type) {
//     this.ctx = ctx;
//     this.pos = pos;
//     this.color = color;
//     this.petalStepsLeft = 200;
//     this.petalNotComplete = true;
//     this.type = type;

//     this.radius = 0.5;
//     this.degree = 0;
//     this.vel = this.convertToVelocity(this.degree);
//   }

//   draw() {
//     if (this.petalStepsLeft > 0) {
//       this.ctx.beginPath();
//       this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
//       this.ctx.fillStyle = this.color;
//       this.ctx.fill();
//       this.petalStepsLeft --;
//     } else {
//       this.petalNotComplete = false;
//       console.log('finished drawing petal');
//     }
//   }

//   move() {
//     this.pos[0] += this.vel[0];
//     this.pos[1] += this.vel[1];
//     this.updateVelocity()
//   }

//   updateVelocity() {
//     this.degree += 0.1;
//     this.vel = this.convertToVelocity(this.degree);
//   }

//   convertToVelocity(degree) {
//     if (this.type === 'A') {
//       return [Math.sin(degree), Math.cos(degree)]
//     } else {
//       return [Math.sin(degree), -Math.cos(degree)]
//     }
//   }
// }

// export default Petal;

// and inside flower:
// draw() {
//   if (this.stemNotComplete) {
//     this.drawStem();
//   } else {
//     if (this.petals.length === 0) {
//       this.petals.push(new Petal(this.ctx, this.pos, '#FF0000', 'A'));
//       this.petals.push(new Petal(this.ctx, this.pos, '#0000FF', 'B'));
//     }
//     if (this.petals[0].petalNotComplete) {
//       this.petals[0].draw();
//     }
//     if (this.petals[1].petalNotComplete) {
//       this.petals[1].draw();
//     }
//   }