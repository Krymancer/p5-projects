let nParticules = 100;
let arr = [];
let t=0;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  //colorMode(HSB, 1, 1, 1);
  background(32,32,32);
  //createCanvas(800,600);
  for(let i=0;i<nParticules;i++){
    let x  = random(0,width);
    let y = random(0,height);
    let p = new Particle(x,y);
    arr[i] = p;
    p.display();
  }

}

function draw() {
  background(0.1);
  for(let i = 0; i< nParticules;i++){
    arr[i].run();
    arr[i].repulse(arr[(i+1)%nParticules]);
    arr[i].atract(arr[(i+1)%nParticules]);

  }
  t += 0.1;
}

