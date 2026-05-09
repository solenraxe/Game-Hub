This is a classic games hub website on which you can play multiple games built in HTML, CSS and JavaScript on VS Studio Code.
I developed it in my free time, I was lacking prior JavaScript experience so it probably isn't as optimized as I'd like it to be.

My motivation behind this was that I wanted to be able to play any classic game I wanted online, but most websites I could find online were stuffed with ads. I decided to take the matter into my own hands and develop the website myself, even though my only experience building a website was in my computer science class over a year ago.
I also wanted this to be a learning experience, as I did not have the opportunity to play around with JavaScript earlier in my life, and I think in that aspect it is a very successful project.

You can choose to play any featured game you want from the index.
All games start by pressing Enter.
Games featured :
- Flappy Bird :
The classic Flappy Bird game, except I switched up the bird with a dinosaur because I don't like the bird...
The sprite doesn't rotate...

Pipes spawn at a random interval, with a minimum of 100 frames (1.66 seconds) between each one.
Your goal is to avoid the pipes coming at you, if you touch one, you lose.
Each pipe you pass increases your score by 1.
Every 10 score gained, the difficulty increases, this only happens up to 80 score points.
Every time the difficulty increases, the maximum interval between pipes shrinks, and pipes go faster.

Press Enter to start a game, Space to jump.

There isn't much more to it, but since it was my first JavaScript project it took me some time to learn how to do OOP and the syntax

- Snake :
The classic Snake game.
Apples spawn randomly on the map, your goal is to collect them.
Your snake moves automatically, you can only choose the direction it moves in.
Each time you collect an apple with your snake, you grow by 1 and gain a point.
Your ultimate goal is to fill out the screen with your snake.
Colliding with a wall or yourself will kill you.

The game uses a 20x20 grid to represent the map, allowing for good perfomance and easier collision checks.

Press Left Arrow to go left, Right Arrow to go right, Up Arrow to go up and Down Arrow to go down.
Press Enter to start a game.

You can't move in the opposite direction you're already going in (would instantly kill you anyway).
