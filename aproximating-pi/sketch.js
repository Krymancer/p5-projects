let collisions = 0;
let div;
let digits = 7;
let dt = 1e6;

function setup() {
  createCanvas(windowWidth, 400);
  block1 = new Block(100,20,1,0);
  const m = pow(100,digits-1);
  block2 = new Block(300,100,m,-5/dt);
  div = createDiv(collisions);
}


function draw() {
  background(72,72,72);
  noStroke();

  for(let i=0;i<dt;i++){
    if(block1.collide(block2)){
      let v1 = block1.bounce(block2);
      let v2 = block2.bounce(block1);
      block1.v = v1;
      block2.v = v2;
      collisions ++;
    }
    
    if(block1.hitWall()){
      block1.reverse();
      collisions++;
    }

    block1.update();
    block2.update();
  }


  block1.show();
  block2.show();

  div.html('<br> Digits: ' + digits + '<br>Collsions: ' + nf(collisions,digits));
}