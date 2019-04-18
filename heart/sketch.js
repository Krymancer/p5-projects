let heart = [];
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1);
  background(0.1);
}


function draw() {
  //background(0.1);
  translate(width/2,height/2);

  noFill();
  stroke(255);
  strokeWeight(5);
  beginShape(POINTS);
  let r = 10;
  let x = r * 16 * pow(sin(angle),3);
  let y = -r *(13 * cos(angle) - 5 * cos(2 * angle) - 2*cos(3*angle) - cos(4 * angle));
  vertex(x,y);
  endShape(CLOSE);

  angle += 0.01;

  if(angle > TWO_PI){
    noLoop(); 
  }


}