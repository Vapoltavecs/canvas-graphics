class Chart {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.init();
  }
  init() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height);
    this.ctx.closePath();
  }
  drawLine([x, y], color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineTo(x, y);

    this.ctx.stroke();
  }
}

export default Chart;
