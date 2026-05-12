export class Player {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.radius = 15;
    this.color = "white";
    this.velocity = { x: 0, y: 0 };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // Basic movement logic
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update(keys) {
    // Basic WASD / Arrow Key Logic
    if (keys['ArrowUp'] || keys['w']) this.y -= 5;
    if (keys['ArrowDown'] || keys['s']) this.y += 5;
    if (keys['ArrowLeft'] || keys['a']) this.x -= 5;
    if (keys['ArrowRight'] || keys['d']) this.x += 5;
}
}