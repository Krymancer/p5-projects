/**
* Array used to hold values for the quicksort algorithim
*/
var data = [];

/**
* Array used to hold values for the sorting animation
*/
var animArray = [];

var rectSize = 5;
var valuesToGenerate = 274;
var verticalScaler = 2.42;
var frame = 0;

function setup(){

  for (var i = 0; i < valuesToGenerate; i++){
    data[i]=(i%700)*verticalScaler;
  }

  shuffle(data, true);

  console.log("Start: " + data);
  quicksort(data, 0, data.length-1);
  console.log("End: " + data);

  let canvas = createCanvas(window.innerWidth,window.innerHeight);
  
}

function draw(){
  let currentFrame;

  //play the animation until the frame count is equal to the length of the animation
  if(frame < animArray.length){
    currentFrame = animArray[frame];
  } else {
    //display a frame of the sorted data
    currentFrame = new arrayFrame(data.toString(), null, null, null);
    console.log("Animation Over");

    //stop the draw method from looping
    noLoop();
  }

  //fill the background color
  background(51);

  for (var i = 0; i < valuesToGenerate; i++){
    fill(255);

    if(currentFrame.midIndex == i){
      fill(255,0,0);
    }

    if(currentFrame.lowVal == i || currentFrame.highVal == i){
      fill(0,255,0);
    }

    rect(i*rectSize,height,rectSize,-currentFrame.getArray()[i]);
  }

  frame++;
}

/**
* An implimentation of the quicksort algorithim in javascript with p5js
* @param array the array of data being worked on
* @param low the low values
* @param high the high value
*/
function quicksort(array, low, high){

  //Its sorted?
  if(low >= high || array == null){
    animArray.push(new arrayFrame(array.toString(), 0, array.length, 0));
    return;
  }

  //Pick a pivot point in the middle of the passed array.
  let mid = floor(low + ((high-low) / 2));
  let pivot = array[mid];

  let l = low;
  let h = high;

  while(l <= h){
      while(array[l] < pivot){
        l++;
      }

      while(array[h] > pivot){
        h--;
      }

      if(l <= h){
        //console.log(array, l, h, mid);
        //console.log("Switch: " + array[l] + ":" + array[h]);
        animArray.push(new arrayFrame(array.toString(), l, h, mid));

        let tmp = array[l];
        array[l] = array[h];
        array[h] = tmp;
        l++;
        h--;
      }
  }

  if(low < h){
    quicksort(array, low, h);
  }

  if(high > l){
    quicksort(array, l, high);
  }
}

/**
* Constructor for a arrayFrame object
* @param arrayState the array of data at a current point in time
* @param lowVal the low index
* @param highVal the high midIndex
* @param midIndex the pivot index
* @param getArray Returns the array at the current time
*/
function arrayFrame(arrayState, lowVal, highVal, midIndex){
  this.arrayState = arrayState;
  this.lowVal = lowVal;
  this.highVal = highVal;
  this.midIndex = midIndex;

  this.getArray = function(){
    return this.arrayState.split(",");
  }
}