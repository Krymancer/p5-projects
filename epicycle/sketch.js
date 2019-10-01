let x = [];
let fourirer;

let wtf;

let time = 0;
let path = [];

// preload table data
function preload() {
  wtf = loadTable(
    'data.csv',
    'csv',
    'header');
}


function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  colorMode(HSB, 1, 1, 1);
  background(0.1);

  for(let i=1;i<wtf.getRowCount();i++){
    const c = new Complex(wtf.getNum(i,0),wtf.getNum(i,1));
    x.push(c);
  }

  fourirer = dft(x);
  fourirer.sort((a,b) => b.amp - a.amp);
}

function draw() {
  background(0.1);

  const dt = TWO_PI / fourirer.length;
  time += dt;

  let v = epicycles(width/2,height/2,PI,fourirer);

  path.unshift(v);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  if(time > TWO_PI){
    noLoop();
    time = 0;
    path = [];
  }
}

function epicycles(x,y,rotation,fourirer){
  for (let i = 0; i < fourirer.length; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourirer[i].freq;
    let radius = fourirer[i].amp;
    let phase = fourirer[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    // stroke(255);
    stroke(5 * i / (radius), 1, 1);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x,y);
}
