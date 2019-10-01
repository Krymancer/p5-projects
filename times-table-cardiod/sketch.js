let r;
let factor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = height / 2 - 16;
  textSize(48);
  textFont('ariel');
}

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  background(0);
  const total = 200;
  factor += 0.01;
  let print = "Factor: " + parseFloat(Math.round(factor * 100) / 100).toFixed(2);
  fill(255);
  noStroke();
  text(print, 20, height - 20);
  translate(width / 2, height / 2);
  stroke(255, 150);
  strokeWeight(2);
  noFill();
  ellipse(0, 0, r * 2);

  strokeWeight(2);
  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    line(a.x, a.y, b.x, b.y);
  }
}