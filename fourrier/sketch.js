// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA
// https://editor.p5js.org/codingtrain/sketches/SJ02W1OgV

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
  createCanvas(window.innerWidth-10,window.innerHeight - 50);
  //slider = createSlider(1, 20, 5);
  text = createInput('5');
}

function draw() {
  background(255);
  translate(400, 300);

  let x = 0;
  let y = 0;

  for (let i = 0; i < text.value(); i++) {
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
