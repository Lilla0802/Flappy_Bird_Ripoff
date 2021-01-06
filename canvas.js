var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


  var x = c.width / 20; //These 2 variables determine the starting circles location, in this case, the top left of the screen.
  var y = c.height / 20;

  var dx = 5; //These variables will be used later to change the position of the circle.
  var dy = 5; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).

  var gravity = 0.2; //Sets the gravity pulling the ball to the ground.
  var damping = 0.75; //The rate at which the ball slows down.
  var traction = 0.95; //Will make the ball stop.
  var ballSize = 20; //Sets the circle's radius.

  function drawCircle() {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
    ctx.fillStyle = "#0095DD"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke();
  }

    var rectWidth = Math.floor(Math.random() * (150 - 100) + 100);
    var rectHeight = Math.floor(Math.random() * (200 - 150) + 150);
    var rect = {width: rectWidth, height: rectHeight};
    var xRange = Math.floor(Math.random() * ((c.width - rect.width) - (0 + rect.width)) + (0 + rect.width));
    var yRange = c.height - rect.height;

  function draw() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(xRange, yRange, rect.width, rect.height);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(xRange, 0, rect.width, rect.height);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle

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
  }
  setInterval(draw, 10);

  document.addEventListener("keydown", makeBounce);
  function makeBounce(e) {
    if (e.key == " ") {
      dy -= 10;
    }
    if (e.key == "r") {
      dx = -dx;
    }
  }
