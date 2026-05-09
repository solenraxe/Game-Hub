let gameWindow = document.getElementById("game-window");
const heightRatio = gameWindow.clientHeight/400;

let score = 0;
let gameSpeed = 0;
let gameOn = false;

function updatePosition(element, x, y) {
    element.style.left = x + "px";
    element.style.top = y + "px";
}

function setupElement(element, width, height, src) {
    element.style.width = width + "px";
    element.style.height = height + "px";
    element.className = "entity";
    if (src) {
        element.src = src;
    }
}

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

        updatePosition(this.img, this.x, this.y);
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

            capImg: document.createElement("img"),
        }
        setupElement(this.pipeTop.img, this.pipeTop.width, this.pipeTop.height, "assets/Pipe.png");
        setupElement(this.pipeTop.capImg, 50 * heightRatio, 20 * heightRatio, "assets/PipeCap.png");

        this.pipeBottom = {
            x: gameWindow.clientWidth,
            y: this.pipeTop.height + 150 * heightRatio,
            width: 50 * heightRatio,
            height: gameWindow.clientHeight - this.pipeTop.height - 150 * heightRatio,
            img: document.createElement("img"),

            capImg: document.createElement("img"),
        }
        setupElement(this.pipeBottom.img, this.pipeBottom.width, this.pipeBottom.height, "assets/Pipe.png");
        setupElement(this.pipeBottom.capImg, 50 * heightRatio, 20 * heightRatio, "assets/PipeCap.png");
    }

    move() {
        this.pipeTop.x -= 2 + gameSpeed;
        this.pipeBottom.x -= 2 + gameSpeed;

        if (this.pipeTop.x + this.pipeTop.width/2 < player.x + player.width/2 && !this.passed) {
            this.passed = true;
            score++;
            document.getElementById("score").innerText = 'Score : ' + score;
            if (score % 10 === 0) {
                gameSpeed = Math.min(gameSpeed + 0.5, 4);
            }
        }

        if (this.pipeTop.x + this.pipeTop.width < 0) {
            pipes.splice(pipes.indexOf(this), 1);
            gameWindow.removeChild(this.pipeTop.img);
            gameWindow.removeChild(this.pipeBottom.img);
            gameWindow.removeChild(this.pipeTop.capImg);
            gameWindow.removeChild(this.pipeBottom.capImg);
        }

        updatePosition(this.pipeTop.img, this.pipeTop.x, this.pipeTop.y);
        updatePosition(this.pipeBottom.img, this.pipeBottom.x, this.pipeBottom.y);
        updatePosition(this.pipeTop.capImg, this.pipeTop.x, this.pipeTop.y + this.pipeTop.height);
        updatePosition(this.pipeBottom.capImg, this.pipeBottom.x, this.pipeBottom.y - this.pipeBottom.capImg.height);
    }
}

let player = new Player();
let pipes = [];

document.addEventListener("keydown", function(event) {
    if (gameOn) {
        if (event.code === "Space") {
            player.vy = -9 * heightRatio;
        }
    } else {
        if (event.key === "Enter") {
            gameOn = true;
            score = 0;
            document.getElementById("score").innerText = 'Score : ' + score;
        }
    }
});

function createPipe() {
    let pipe = new Pipe();
    pipes.push(pipe);
    gameWindow.appendChild(pipe.pipeTop.img);
    gameWindow.appendChild(pipe.pipeBottom.img);
    gameWindow.appendChild(pipe.pipeTop.capImg);
    gameWindow.appendChild(pipe.pipeBottom.capImg);
}

function deleteAllPipes() {
    for (let pipe of pipes) {
        gameWindow.removeChild(pipe.pipeTop.img);
        gameWindow.removeChild(pipe.pipeBottom.img);
        gameWindow.removeChild(pipe.pipeTop.capImg);
        gameWindow.removeChild(pipe.pipeBottom.capImg);
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
let pipeInterval = 200;
function gameLoop() {
    if (gameOn) {
        frameCount++;
        player.move();
        if (frameCount >= pipeInterval) {
            createPipe();
            pipeInterval = Math.max(100, 250 - gameSpeed * 25);
            frameCount = 0;
        }
        for (let pipe of pipes) {
            pipe.move();
            if (pipe.pipeTop.x <= player.x + player.width + 5) {
                if (checkCollision(player, pipe.pipeTop) || checkCollision(player, pipe.pipeBottom)) {
                    deleteAllPipes();
                    gameOn = false;
                    frameCount = 0;
                    gameSpeed = 0;
                }
            }
        }
    }
}

setInterval(gameLoop, 1000/60);