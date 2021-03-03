var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var ball = {x: c.width/20, y: c.height/20, ballSize: 5, dx: 0, dy: 10}
var gravity = .5; //Sets the gravity pulling the ball to the ground.
var damping = 0.75; //The rate at which the ball slows down.
var newArray = [];
var timer = 0;
var spaceDifficulty = 400;
var score = 0;

/*var lowerRect = {xL: c.width - 10, yL: c.height - 100, widthL: 50, heightL: c.height};
var upperRect = {xU: c.width - 10, yU: 0, widthU: 50, heightU: c.height - 200};
var pipes  = {side1:upperRect.x + upperRect.y, side2 :upperRect.width + upperRect.height};
console.log()*/

function drawCircle() {//this draws the ball keeps the shape and the colors
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
  ctx.fillStyle = "pink"; //Sets the color of the circle to light blue.
  ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  ctx.stroke();
}

function makePipe(){
  ctx.clearRect(0, 0, c.width, c.height); //since it's a loop, this clears the canvas or else a lot of circles will be draw each time this function loops
  for (var i = 0; i < newArray.length; i++) {
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(newArray[i].xL, newArray[i].yL, newArray[i].widthL, newArray[i].heightL);
    ctx.fillStyle = "purple"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(newArray[i].xU, newArray[i].yU, newArray[i].widthU, newArray[i].heightU);
    ctx.fillStyle = "purple"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
  }
}

/*This function checks for collision with the pipes and if the ball has passed trought a pipe
function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight) {
  if ((ball.x + dx + ball.ballSize > lowRectX) && (ball.x + dx + ball.ballSize < lowRectX + 2)) {//checks if the ball has passed between the pipes
    score ++; //it yes, add one to score
    console.log(score); //log the score in the console
    document.getElementById('score').innerHTML = "Score = " + score;// shows the score on the screen
  }
  if ((ball.x + dx + ball.ballSize > upRectX) && (ball.y + ball.ballSize < upRectHeight) && (ball.ballSize + ball.x < upRectX + upRectWid)) { //checks for collision with the top pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + dy - ball.ballSize < upRectHeight) && (ball.x + ball.ballSize < upRectWid + upRectX + 50) && (ball.ballSize + ball.x > upRectX)) { //checks for collision with the bottom of the top pipe
    gameState = 2;//if true, ends the game
  }
  if ((ball.x + dx + ball.ballSize > lowRectX) && (ball.y + ball.ballSize > lowRectY) && (ball.ballSize + ball.x < lowRectX + lowRectWid)) { //checks for the collision with the bottom pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + dy + ball.ballSize > lowRectY) && (ball.x + ball.ballSize < lowRectWid + lowRectX + 50) && (ball.ballSize + ball.x > lowRectX)) { //checks for collision with the top of the bottom pipe
    gameState = 2;//if true, ends the game
  }
}*/
//This function checks for collision with the pipes and if the ball has passed trought a pipe
function collisionCheck(xL, yL, widthL, heightL, xU, yU, widthU, heightU) {
  if ((ball.x + dx + ball.ballSize > xL) && (ball.x + dx + ball.ballSize < xL + 2)) {//checks if the ball has passed between the pipes
    score ++; //it yes, add one to score
    console.log(score); //log the score in the console
    document.getElementById('score').innerHTML = "Score = " + score;// shows the score on the screen
  }
  if ((ball.x + dx + ball.ballSize > xU) && (ball.y + ball.ballSize < heightU) && (ball.ballSize + ball.x < xU + widthU)) { //checks for collision with the top pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + dy - ball.ballSize < heightU) && (ball.x + ball.ballSize < widthU + xU + 50) && (ball.ballSize + ball.x > xU)) { //checks for collision with the bottom of the top pipe
    gameState = 2;//if true, ends the game
  }
  if ((ball.x + dx + ball.ballSize > xL) && (ball.y + ball.ballSize > yL) && (ball.ballSize + ball.x < yL + widthL)) { //checks for the collision with the bottom pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + dy + ball.ballSize > yL) && (ball.x + ball.ballSize < widthL + xL + 50) && (ball.ballSize + ball.x > xL)) { //checks for collision with the top of the bottom pipe
    gameState = 2;//if true, ends the game
  }
}

function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  if (timer == spaceDifficulty) {
    var rectArray = {xL: c.width - 10, yL: c.height - 100, widthL: 50, heightL: c.height, xU: c.width - 10, yU: 0, widthU: 50, heightU: c.height - 200};
    newArray.push(rectArray);
    timer = 0;
  }
  for (var i = 0; i < newArray.length; i++) {
    makePipe(newArray[i].xL, newArray[i].yL, newArray[i].widthL, newArray[i].heightL, newArray[i].xU, newArray[i].yU, newArray[i].widthU, newArray[i].heightU);
    newArray[i].xL --;
    newArray[i].xU --;
  }
  drawCircle();
  if (ball.x + ball.dx > c.width - ball.ballSize || ball.x + ball.dx < ball.ballSize) { //If the circle's x position exceeds the width of the canvas...
    ball.dx = -ball.dx; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }
  if(ball.y + ball.dy > c.height - ball.ballSize || ball.y + ball.dy < ball.ballSize) { //If the circle's y position exceeds the height of the canvas...
    ball.dy = -ball.dy * damping; //Its y direction will be flipped, and it's speed will decrease.
  }
  ball.dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.
  ball.x += ball.dx;
  if (((ball.y + ball.dy) + ball.ballSize) <= c.height) {
    ball.y += ball.dy;
  }
  for (var i = 0; i < newArray.length; i++) {
    collisionCheck(newArray[i].xL, newArray[i].yL, newArray[i].widthL, newArray[i].heightL, newArray[i].xU, newArray[i].yU, newArray[i].widthU, newArray[i].heightU);
  }
  timer ++;
}
/*var luma = new Image();
luma.src = "luma.png";
luma.width = 10;
luma.height = 10;
ctx.drawImage(luma,150,150,10,10)
setInterval(draw, 15);
*/
document.addEventListener("keydown", makeBounce);
 function makeBounce(e) {
   if (e.key == " ") {
     ball.dy -= 10;
   }
   if (e.key == "r") {
     ball.dx = -ball.dx;
   }
 }
