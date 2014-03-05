<h2>8-Puzzle Solver:</h2>

 <div>
 Program: <a href="http://cs.iupui.edu/~spdwiecz/JavaScript/csci487_Proj1/projAI.html">8 Puzzle Solver</a>
 </div>

<p>This solves the 8 Puzzle problem such that it uses a brute force appach VS a better non-blind and better approach The A* path finding approach. So here is the general outline:</p>
<pre>
 -------------
 | 1 | 2 | 3 |
 -------------
 | 4 | 5 | 6 |
 -------------
 | 7 | 8 |   |
 -------------
 </pre>
 <p>
 We will construct this as a 2D array [[1,2,3],[4,5,6],[7,8,0]], where "0" is the empty state. From this we can find the "children" of the current starting root (our start state) by the possible transtions we can make, this is either 2,3 or 4 possible children generated for each state. We will store the states in a fringe (open) list and have it be such that the new children are placed in the start as a queue, we will also check to make sure we don't cycle by removing all duplicate states based on our current open list.
 </p>
 <h4>Breath-first:</h4>
 <p>
 For this we simply expand every node we generate, this makes our tree get very big very fast. So as long as our solution isn't too far away state wish we should be ok. Too far away and we run into issues so Iv'e added a "stopper" to stop the search if the fringe gets too big.
 </p>
 <h4>A* Search:</h4>
 <p>
 For this our heristic function will be the number of nodes in the correct position, and our deapth, to determine which move to make. So the cost is 1 for each transition, and we take away 1 for each correct state, then we give it a very small number if it's the solution (-999 in our case). From these condition we only look at the children of the lowest-cost node in our fringe list. We also get the shortest solution with this implementation of A*.
 </p>
 
<h6>Updates</h6>
<ul>
<li>Visual Solving added (for A*) : Now the computer shows you how it solved the puzzle.</li>
</ul>

<h6>Bugs/Notes:</h6>
<ul>
<li>Note that both of these algorthims can take a long time, for Breath-first it needs to traverse an ever expanding tree. For A* we expand based on cost but we are still looking for the shortest solution, this can take some time to find aswell. There is still some optimiation that can be done although unless we move to a lower level language they can't find the solutions quickly each time.</li>
</ul>
</ul>
