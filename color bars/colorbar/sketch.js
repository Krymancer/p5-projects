function setup() {
  createCanvas(800,600);
  var colors = [255,255,255, 255,255,0, 0,255,255, 0,255,0, 255,0,255, 255,0,0, 0,0,255];
  for(i=0;i<7;i++){
    fill(colors[i*3],colors[(i*3)+1],colors[(i*3)+2]);
    rect(i*(width/7),0,width/7,height-150); //starting the frist bar in 0,0 and proceed until reach the end.
    fill(255 - (i*42.5)); // 255/6 = 42.5, so we graduating getting darker until we reach black(0).
    rect(i*(width/7),height-150,width/7,height); //same of the frist rect, but starting in a lower height.
  }
}

function draw() {
  
}
