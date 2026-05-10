This is a classic steampunk-themed games hub website on which you can play multiple games built in HTML, CSS and JavaScript on VS Studio Code, I did not use any external libraries for this project.
I developed it in my free time for the Beest event, I was lacking prior JavaScript experience so it probably isn't as optimized as I'd like it to be.
<img width="660" height="380" alt="Index" src="https://github.com/user-attachments/assets/37525264-5952-4c54-9df4-96eb6dede2dc" />

Originally, I only wanted to make Flappy Bird, which is also the reason the name of the first Hackatime project linked to this is "Flappy Bird Project", but it was a bit underwhelming compared to what I was expecting, so I quickly decided to spice it up and make a game hub instead.
My motivation behind this was that I wanted to be able to play classic games without downloading them, but most websites I could find online were full of intrusive ads, which I don't really like. I decided to take the matter into my own hands and develop the website myself, even though my only experience building a website was in my computer science class over a year ago.
Since this is open-source, anyone can contribute and add games they like, which is the aspect of this project I like the most.
I also wanted this to be a learning experience, as I did not have the opportunity to play around with JavaScript earlier in my life, and I think in that aspect it was a very successful project.
The Flappy Bird game is inspired from my own python version that I developped for an arcade machine at my school, which is why the sprite is a dinosaur.

To play the demo, you just have to clink the link towards GitHub Pages, the site is public there.
You can choose to play any featured game you want from the index.
All games start by pressing Enter.
Games featured :
- Flappy Bird :
The classic Flappy Bird game, except I switched up the bird with a dinosaur because I don't like the bird...
The sprite doesn't rotate...
<img width="125" height="125" alt="FlappyBird" src="https://github.com/user-attachments/assets/88f95baa-72bc-4c5c-8ead-18fc7e630648" />


Pipes spawn at a random interval, with a minimum of 40 frames (.66 seconds) between each one.
Your goal is to avoid the pipes coming at you, if you touch one, you lose.
Each pipe you pass increases your score by 1.
Every 10 score gained, the difficulty increases, this only happens up to 80 score points.
Every time the difficulty increases, the interval between pipes shrinks, and pipes go faster.

Press Enter to start a game, Space to jump.

There isn't much more to it, but since it was my first JavaScript project it took me some time to learn how to do OOP and the syntax

- Snake :
The classic Snake game.
Apples spawn randomly on the map, your goal is to collect them.
Your snake moves automatically, you can only choose the direction it moves in.
Each time you collect an apple with your snake, you grow by 1 and gain a point.
Your ultimate goal is to fill out the screen with your snake.
Colliding with a wall or yourself will kill you.
<img width="125" height="125" alt="Snake" src="https://github.com/user-attachments/assets/99febe9f-c6a8-4f6d-83fa-b253c88b403c" />


The game uses a 20x20 grid to represent the map, allowing for good perfomance and easier collision checks.

Press Left Arrow to go left, Right Arrow to go right, Up Arrow to go up and Down Arrow to go down.
Press Enter to start a game.

You can't move in the opposite direction you're already going in (would instantly kill you anyway).
