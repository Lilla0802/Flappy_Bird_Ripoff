var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var x = myCanvas.width / 20; //These 2 variables determine the starting circles location, in this case, the top left of the screen.
var y = myCanvas.height / 20;

var dx = 0; //These variables will be used later to change the position of the circle.
var dy = 10; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).

var gravity = .5; //Sets the gravity pulling the ball to the ground.
var damping = 0.75; //The rate at which the ball slows down.
var ballSize = 5; //Sets the circle's radius.

function drawCircle() {//this draws the ball keeps the shap and the colors
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
  ctx.fillStyle = "#FF00FF"; //Sets the color of the circle to light blue.
  ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  ctx.stroke();
}

//var rectWidth = Math.floor(Math.random() * (150 - 100) + 100);
//var rectHeight = Math.floor(Math.random() * (200 - 150) + 150);
//var rect = {width: rectWidth, height: rectHeight};
//var xRange = c.width - rectWidth;

//var yRange = c.height - rect.height;
var lowerRect = {x: c.width - 10, y: c.height - 100, width: 50, height: c.height};
var upperRect = {x: c.width - 10, y: 0, width: 50, height: c.height - 200};

var newArray = [ {x: c.width - 10, y: c.height - 100, width: 50, height: c.height},
{x: c.width - 10, y: 0, width: 50, height: c.height - 200}];

  function makePipe(){
    ctx.clearRect(0, 0, c.width, c.height); //since it's a loop, this clears the canvas or else a lot of circles will be draw each time this function loops
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(lowerRect.x, lowerRect.y, lowerRect.width, lowerRect.height);
    ctx.fillStyle = "purple"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(upperRect.x, upperRect.y, upperRect.width, upperRect.height);
    ctx.fillStyle = "purple"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    lowerRect.x = lowerRect.x - 1;
    if ((lowerRect.x + lowerRect.width) == 0) {
      lowerRect.x = c.width;
    }
    upperRect.x = upperRect.x - 1;
    if ((upperRect.x + upperRect.width) == 0) {
      upperRect.x = c.width;
    }
  }
/*  var lowerRect2 = {x: c.width - 5, y: c.height - 50, width: 50, height: c.height};
  var upperRect2 = {x: c.width - 15, y: 0, width: 100, height: c.height - 300};

function Pipes2() {
  ctx.clearRect(5,5, c.width, c.height);
  ctx.beginPath();
  ctx.ract(lowerRect2.x, lowerRect2.y, lowerRect2.width, lowerRect2.height);
  ctx.fillStyle="purple";
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(upperRect2.x, upperRect2.y, upperRect2.width, upperRect2.height);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.stroke();
  lowerRect2.x = lowerRect2.x - 1;
  if ((lowerRect2.x + lowerRect2.width) == 1) {
    lowerRect2.x = c.width;
  }
  upperRect2.x = upperRect2.x - 1;
  if ((upperRect2.x + upperRect2.width) == 1) {
    upperRect.x = c.width;
  }
}
*/

var score = 0;
function draw() {
  var scoreBox = {x: c.width - 10, y: c.height - 200, width: 10,  height: 100};
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  /*
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.fillRect(lowerRect.x, lowerRect.y, lowerRect.width, lowerRect.height);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.fillRect(upperRect.x, upperRect.y, upperRect.width, upperRect.height);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.fillRect(scoreBox.x, scoreBox.y, scoreBox.width, scoreBox.height);
  ctx.fill();
  ctx.stroke();
  */
  makePipe();
  drawCircle();
  if (x + dx > c.width - ballSize || x + dx < ballSize) { //If the circle's x position exceeds the width of the canvas...
    dx = -dx; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }

  if(y + dy > c.height - ballSize || y + dy < ballSize) { //If the circle's y position exceeds the height of the canvas...
    dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
  }
  dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.
  x += dx;
  if (((y + dy) + ballSize) <= c.height) {
    y += dy;
  }
  //these 2 ifs are the collision
  if (x < lowerRect.x + lowerRect.width && x + ballSize > lowerRect.x && y < lowerRect.y + lowerRect.height && y + ballSize > lowerRect.y) {
    dx = -dx;
    score += 1;
    console.log(score);
  }
  if (x < upperRect.x + upperRect.width && x + ballSize > upperRect.x && y < upperRect.y + upperRect.height && y + ballSize > upperRect.y) {
    dx = -dx;
    score += 1;
    console.log(score);
  }
}

setInterval(draw, 15);

document.addEventListener("keydown", makeBounce);
 function makeBounce(e) {
   if (e.key == " ") {
     dy -= 10;
   }
   if (e.key == "r") {
     dx = -dx;
   }
 }
