let gameWindow = document.getElementById("game-window");
const heightRatio = gameWindow.clientHeight/400;

let score = 0;

class Player {
    constructor() {
        this.img = document.getElementById("player");
        this.width = 35 * heightRatio;
        this.height = 35 * heightRatio;
        this.x = gameWindow.clientWidth/10;
        this.y = gameWindow.clientHeight/2 - this.height/2;
        this.vy = 0;

        this.img.style.width = this.width + "px";
        this.img.style.height = this.height + "px";
    }

    move() {
        this.y += this.vy;
        this.vy = this.vy * 0.95 + 0.65 * heightRatio;

        if (this.y + this.height > gameWindow.clientHeight) {
            this.y = gameWindow.clientHeight - this.height;
            this.vy = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.vy = 0;
        }

        this.img.style.left = this.x + "px";
        this.img.style.top = this.y + "px";
    }
}

class Pipe {
    constructor() {
        this.passed = false;

        this.pipeTop = {
            x: gameWindow.clientWidth,
            y: 0,
            width: 50 * heightRatio,
            height: (Math.random() * 200 + 50) * heightRatio,
            img: document.createElement("img"),

            cap: {
                width: 50 * heightRatio,
                height: 20 * heightRatio,
                img: document.createElement("img"),
            }
        }
        this.pipeTop.img.src = "Pipe.png";
        this.pipeTop.img.className = "pipe";
        this.pipeTop.img.style.height = this.pipeTop.height + "px";
        this.pipeTop.img.style.width = this.pipeTop.width + "px";
        this.pipeTop.cap.img.src = "PipeCap.png";
        this.pipeTop.cap.img.className = "pipe";
        this.pipeTop.cap.img.style.height = this.pipeTop.cap.height + "px";
        this.pipeTop.cap.img.style.width = this.pipeTop.cap.width + "px";

        this.pipeBottom = {
            x: gameWindow.clientWidth,
            y: this.pipeTop.height + 150 * heightRatio,
            width: 50 * heightRatio,
            height: gameWindow.clientHeight - this.pipeTop.height - 150 * heightRatio,
            img: document.createElement("img"),

            cap: {
                width: 50 * heightRatio,
                height: 20 * heightRatio,
                img: document.createElement("img"),
            }
        }
        this.pipeBottom.img.src = "Pipe.png";
        this.pipeBottom.img.className = "pipe";
        this.pipeBottom.img.style.height = this.pipeBottom.height + "px";
        this.pipeBottom.img.style.width = this.pipeBottom.width + "px";
        this.pipeBottom.cap.img.src = "PipeCap.png";
        this.pipeBottom.cap.img.className = "pipe";
        this.pipeBottom.cap.img.style.height = this.pipeBottom.cap.height + "px";
        this.pipeBottom.cap.img.style.width = this.pipeBottom.cap.width + "px";
    }

    move() {
        this.pipeTop.x -= 2;
        this.pipeBottom.x -= 2;
        this.pipeTop.cap.x = this.pipeTop.x;
        this.pipeTop.cap.y = this.pipeTop.y + this.pipeTop.height;
        this.pipeBottom.cap.x = this.pipeBottom.x;
        this.pipeBottom.cap.y = this.pipeBottom.y - this.pipeBottom.cap.height;

        if (this.pipeTop.x + this.pipeTop.width/2 < player.x + player.width/2 && !this.passed) {
            this.passed = true;
            score++;
            document.getElementById("score").innerText = 'Score : ' + score;
        }

        if (this.pipeTop.x + this.pipeTop.width < 0) {
            pipes.splice(pipes.indexOf(this), 1);
            gameWindow.removeChild(this.pipeTop.img);
            gameWindow.removeChild(this.pipeBottom.img);
            gameWindow.removeChild(this.pipeTop.cap.img);
            gameWindow.removeChild(this.pipeBottom.cap.img);
        }

        this.pipeTop.img.style.left = this.pipeTop.x + "px";
        this.pipeTop.img.style.top = this.pipeTop.y + "px";
        this.pipeBottom.img.style.left = this.pipeBottom.x + "px";
        this.pipeBottom.img.style.top = this.pipeBottom.y + "px";
        this.pipeTop.cap.img.style.left = this.pipeTop.cap.x + "px";
        this.pipeTop.cap.img.style.top = this.pipeTop.cap.y + "px";
        this.pipeBottom.cap.img.style.left = this.pipeBottom.cap.x + "px";
        this.pipeBottom.cap.img.style.top = this.pipeBottom.cap.y + "px";
    }
}

let player = new Player();
let pipes = [];

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        player.vy = -9 * heightRatio;
    }
});

function createPipe() {
    let pipe = new Pipe();
    pipes.push(pipe);
    gameWindow.appendChild(pipe.pipeTop.img);
    gameWindow.appendChild(pipe.pipeBottom.img);
    gameWindow.appendChild(pipe.pipeTop.cap.img);
    gameWindow.appendChild(pipe.pipeBottom.cap.img);
}

function deleteAllPipes() {
    for (let pipe of pipes) {
        gameWindow.removeChild(pipe.pipeTop.img);
        gameWindow.removeChild(pipe.pipeBottom.img);
        gameWindow.removeChild(pipe.pipeTop.cap.img);
        gameWindow.removeChild(pipe.pipeBottom.cap.img);
    }
    pipes = [];
}

function checkCollision(player, pipe) {
    return (
        player.x < pipe.x + pipe.width &&
        player.x + player.width > pipe.x &&
        player.y < pipe.y + pipe.height &&
        player.y + player.height > pipe.y
    );
}

let frameCount = 0;
function gameLoop() {
    frameCount = (frameCount + 1) % 600;
   
    player.move();

    if (frameCount % 200 === 0) {
        createPipe();
    }
    for (let pipe of pipes) {
        pipe.move();
        if (checkCollision(player, pipe.pipeTop) || checkCollision(player, pipe.pipeBottom)) {
            deleteAllPipes();
            alert("Game Over! Your score: " + score);
            location.reload();
        }
    }
}

setInterval(gameLoop, 1000/60);