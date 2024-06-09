const canvasWidth = 1280 ; 
const canvasHeight = 690 ;
const pointsNumber = 8 ;
const pointSize = 10 ;
var bestDistance = Number.MAX_VALUE;
var tempArray = [0,1,2,3,4,5,6,7];
var bestPath  = [];
var points = []  ;
var allPossiblePathes = [] ;

function setup(){
  //create the array to hold points with random coordinates
  for(let i=0 ;i<pointsNumber ; i++){
    points[i] = createVector(random(canvasWidth) , random(canvasHeight));
  }
  //create the screen 
  createCanvas(canvasWidth,canvasHeight); 
  bestPath = points.slice();
}

function draw(){
  //drawing background
  background(33);
  
  //drawing links between points
  noFill();
  stroke(150);
  strokeWeight(1);
  beginShape();
  for(let i=0 ; i<pointsNumber ; i++){
    vertex(points[i].x , points[i].y);
  }
  endShape(CLOSE);
  //drawing best path 
  noFill();
  stroke(200,0,200);
  strokeWeight(4);
  beginShape();
  for(let i=0 ; i<pointsNumber ; i++){
    vertex(bestPath[i].x , bestPath[i].y);
  }
  endShape(CLOSE);
  //drawing points
  fill(255);
  noStroke();
  points.forEach(e => {
    circle(e.x , e.y , pointSize);
  });
  //swaping elemnts in the array to create differante shapes
  var randomSwap1 = floor(random(pointsNumber));
  var randomSwap2 = floor(random(pointsNumber));
  swap(points , randomSwap1 , randomSwap2);
  //calculating distance and best distance 
  let tempDistance = calculateDistance(points)
  if(bestDistance > tempDistance) {
    bestDistance = tempDistance ;
    bestPath = points.slice() ;
  }
  //drawing all array pathes and best distance
  getAllPossibleArrays(tempArray);
  textSize(32);
  fill(255);
  var theText = "" ;
  tempArray.forEach(e => {theText += e});
  text("pathes : "+theText,10,30);
  text("best : "+bestDistance,10,65);
}


function swap(a , i , j){
  var temp = a[i] ;
  a[i] = a[j] ;
  a[j] = temp ;
}

function calculateDistance(a){
  var distance = 0 ;
  for(let i=0 ; i<pointsNumber-1 ; i++){
    var d = dist(a[i].x , a[i].y , a[i+1].x , a[i+1].y)
    distance += d ;
  }
  distance += dist(a[0].x , a[0].y , a[pointsNumber-1].x , a[pointsNumber-1].y)
  return parseInt(distance) ;
}

function getAllPossibleArrays(a){
  //step 1
  var x = -1 ;
  for(let i=0 ; i<a.length-1 ; i++){
    if(a[i] < a[i+1]) x = i ;
  }
  if(x == -1){
    noLoop();
  }
  //step 2 
  var y = 0 ;
  for(let i=0 ; i<a.length ; i++){
    if(a[x] < a[i]) y = i ;
  }
  //step 3
  swap(a,x,y);
  //step 4
  var as = a.splice(x+1);
  as.reverse();
  a = a.concat(as);
  tempArray = a ;
}