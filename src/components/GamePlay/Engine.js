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

  update(keys) {
    // Basic WASD / Arrow Key Logic
    if (keys['ArrowUp'] || keys['w']) this.y -= 5;
    if (keys['ArrowDown'] || keys['s']) this.y += 5;
    if (keys['ArrowLeft'] || keys['a']) this.x -= 5;
    if (keys['ArrowRight'] || keys['d']) this.x += 5;
  }
}

export class Asteroid {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.radius = 12 + Math.random() * 18;
    this.color = "gray";

    // Spawn on a random edge just outside the canvas, aim somewhere inside.
    const edge = Math.floor(Math.random() * 4);
    const targetX = Math.random() * canvasWidth;
    const targetY = Math.random() * canvasHeight;
    if (edge === 0) {        // top
      this.x = Math.random() * canvasWidth;
      this.y = -this.radius;
    } else if (edge === 1) { // right
      this.x = canvasWidth + this.radius;
      this.y = Math.random() * canvasHeight;
    } else if (edge === 2) { // bottom
      this.x = Math.random() * canvasWidth;
      this.y = canvasHeight + this.radius;
    } else {                 // left
      this.x = -this.radius;
      this.y = Math.random() * canvasHeight;
    }

    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = 1.5 + Math.random() * 2;
    this.velocity = { x: (dx / dist) * speed, y: (dy / dist) * speed };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  isOffScreen() {
    const m = this.radius * 2;
    return (
      this.x < -m ||
      this.x > this.canvasWidth + m ||
      this.y < -m ||
      this.y > this.canvasHeight + m
    );
  }

  collidesWith(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    return Math.hypot(dx, dy) < this.radius + player.radius;
  }
}
