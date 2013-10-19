This is a basic Physics Engine created in JavaScript HTML5 with no exernal libaries. The code is relatively short (less than 200) lines.

Gravity, drawing the balls, and collisions with the side of the canvas, are all quite simple. The harder parts was ball-to-ball
and line-to-ball collisions and then calculating the proper vector the balls should go. For now here is an overview of the two objects in
the code: Ball and Line.

-----Ball:-----

Variables: x , y , dx , dy , r , color, mouseOn, bounce
  
  All of these are mostly self explaintory. r = radius , mouseOn = if the uses is holding the ball or not , bounce = how much bounce the ball has (0 to 1.0)
  
Functions:
  
  draw() -> Draws the ball on the screen.
  
  checkMouse() -> Checks if the mouse is outside or inside the ball
  
  calcBounds() -> Checks the bounaries of the Canvas and applies changes in dx, dy appropriately (basically flipping them).
  
  checkBallCollision() -> Checks if one ball is colliding with another and apllies changes appropriately. In x , y , dx , and dy accoding to this formula: changeX = (balls[i].x+(diffX/dist)*(this.r+balls[i].r)) - this.x; 
  
  checkLineCollision() -> Check for lines to ball collision by computing the distance from the ball to the normal of the line (By vector projection). The computes the correct angle by making a 90* trangle and doubling the angle of angle on the line (sorry, hard to explain without drawing this out).
  
  calcPhysics() -> Simply calls the two functions above and applies gravity or not wheaver or not the ball is being clicked on.
  
  update() -> The main function of the ball, does: calcPhysics(), calcBounds(), and draw().
  
-----Line:-----

Variables: x1 , y1 , x2 , y2, color (Ignore the other variables: They arn't being used and I'll remove them)

Functions:

  draw() -> Draws the line on the screen.
