let time = 0;
let wave = [];
let c = ["#FF0000", 
         "#00FF00", 
         "#0000FF", 
         "#AE20B0", 
         "#F0AF0F",             
         "#21EF0B"];

let slider;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  div = createDiv('Circles:');
  text = createInput('5');
  div.position(10,height-40)
  text.position(70,height-40);
}

function parseInput(){
  return (text.value()!="" && text.value() >  0) ? text.value() : 1;
}

function draw() {
  background(255);
  translate(400, 300);

  let x = 0;
  let y = 0;

  for (let i = 0; i < parseInput(); i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 120 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    //stroke(0,255,0, 100);
    stroke(c[i%5]);

    noFill();
    strokeWeight(3);
    ellipse(prevx, prevy, radius * 2);

    //fill(255);
    stroke(0);
    line(prevx, prevy, x, y);
    //ellipse(x, y, 8);
  }
  wave.unshift(y);

  translate(400, 0);
  strokeWeight(1.8);
  line(x - 400, y, 0, wave[0]);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();
  strokeWeight(3);
  time -= 0.05;

  if (wave.length > 500) {
    wave.pop();
  }
}
