export class Sprite {
  constructor(imgSrc, scale, width, height, cycleLoop, animFPS) {
    this.imgSrc = imgSrc;
    this.scale = scale;
    this.width = width;
    this.height = height;
    this.cycleLoop = cycleLoop;
    this.animFPS = animFPS;
    this.img = null;
    this.currentLoopIndex = 0;
    this.currentDirection = 0;
  }

  async initImage() {
    let loadImg = new Image();
    //img.src = src;
    loadImg.src =
      "https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png";

    await loadImg.decode();

    //loadImg.onload = function () {
    this.img = loadImg;
    //};
  }

  scaledWidth() {
    return this.scale * this.width;
  }
  scaledHeight() {
    return this.scale * this.height;
  }

  drawFrame(frameX, frameY, canvasX, canvasY) {
    const width = this.width;
    const height = this.height;
    this.ctx.drawImage(
      this.img,
      frameX * width,
      frameY * height,
      width,
      height,
      canvasX,
      canvasY,
      this.scaledWidth(),
      this.scaledHeight()
    );
  }

  animate(ctx) {
    //if provided with a context update
    if (typeof ctx === "object") this.ctx = ctx;
    this.ctx.clearRect(0, 0, this.scaledWidth(), this.scaledHeight());
    this.drawFrame(
      this.cycleLoop[this.currentLoopIndex],
      this.currentDirection,
      0,
      0
    );
    this.currentLoopIndex++;
    if (this.currentLoopIndex >= this.cycleLoop.length) {
      this.currentLoopIndex = 0;
      this.currentDirection++;
    }
    // Reset to the "down" direction once we've run through them all
    if (this.currentDirection >= 4) {
      this.currentLoopIndex = 0;
      this.currentDirection = 0;
    }
    setTimeout(
      () => window.requestAnimationFrame(this.animate.bind(this)),
      1000 / this.animFPS
    );
  }
}
