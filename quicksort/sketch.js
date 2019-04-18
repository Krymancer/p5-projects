let arr = [];
const barWidth = 5;

function setup() {
  createCanvas(windowWidth,windowHeight-5);
  for(i=0;i<width/barWidth;i++){
    arr[i] = random(height);
  }

  
}


function draw() {
  background(42,42,42);
  quickSort(arr,0,arr.length);
  noLoop();
}


function quickSort(arr, left, right){
  var len = arr.length, 
  pivot,
  partitionIndex;

 if(left < right){
   pivot = right;
   partitionIndex = partition(arr, pivot, left, right);
   
  //sort left and right
  quickSort(arr, left, partitionIndex - 1);
  quickSort(arr, partitionIndex + 1, right);
  
 }
 return arr;
}
       

function partition(arr, pivot, left, right){
  var pivotValue = arr[pivot],
      partitionIndex = left;

  for(var i = left; i < right; i++){
   if(arr[i] < pivotValue){
     swap(arr, i, partitionIndex);
     partitionIndex++;

    background(42,42,42);
    rect(i*barWidth,height-arr[i],barWidth,height+arr[i]);
   }
 }
 swap(arr, right, partitionIndex);  
 return partitionIndex;
}
       

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
