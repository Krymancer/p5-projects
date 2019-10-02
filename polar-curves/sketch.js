let curves = [
  {//heart curve
    'x': (angle, radius) => {
      return radius * 16 * pow(sin(angle), 3);
    },
    'y': (angle, radius) => {
      return -radius * (13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle));
    },
    'theta': 2*Math.PI,
    'name': 'Heart Curve'
  },
  {//archimedean-spiral
    'x': (angle, radius) => {
      return pow(angle,2)*cos(angle);
    },
    'y': (angle, radius) => {
      return pow(angle,2)*sin(angle);
    },
    'theta':  6*Math.PI,
    'name': 'Archimedean Spiral'
  }
];

let actual = 0;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1);
  background(0.1);
  textSize(48);
  textFont('ariel');
  fill(255);
  text(curves[actual].name,20,40);
}

function draw() {
  //background(0.1);
  translate(width / 2, height / 2);

  noFill();
  stroke(255);
  strokeWeight(5);
  beginShape(POINTS);
  let r = 10;
  // let x = r * 16 * pow(sin(angle), 3);
  // let y = -r * (13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle));
  let x = curves[actual].x(angle, r);
  let y = curves[actual].y(angle, r);
  vertex(x, y);
  endShape(CLOSE);

  angle += 0.01;

  if(angle > curves[actual].theta){
    console.log(actual);
    background(0.1);
    angle = 0;
    actual = (actual+1)%curves.length;
    translate(0,0);
    strokeWeight(1);
    fill(255);
    text(curves[actual].name,-width/2 + 20,-height/2 + 40);
  }
}
