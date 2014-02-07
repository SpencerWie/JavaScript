These are example (but complete) games to be used as examples for the JavaScript tutorial Canvas sections:

Pong : http://jsfiddle.net/nDtLK/6/

A basic pong game with two paddles, the lower paddle is the player which is controled with the mouse while the computer follows the ball based on where it is. The computer's max speed determinds it difficulty (which can be changed easily), the code itself was created so things can be changed easily. The ball can be tilted more or less based on the movement of the paddle, if the paddle was moving quickly left while it hit a ball going left, this would cause the ball to move left even faster. It also has a basic menu screen with a start button.

Snake: http://jsfiddle.net/8uVEh/

A basic snake game. The Game uses Nodes as basic rectangles on the screen, and a Snake object. The mechanices are quite simple: the snake is an array of Nodes ,every frame depending on what key was last pressed: create a new node in the direction based on the key. Then remove the node at the end. If the snake eat the food then don't remove the node at the end (this makes it so there is a new node to the snake array). And place the food at new random position. The collisions only need to be directly X and Y comparisin between nodes, since based on the movement of the game the node will end up in exactly the same place the node if they interest. That's basically the entire game, I thought it was quite clever since Iv'e never made a snake game before.
