let gameWindow = document.getElementById("game-window");
const heightRatio = gameWindow.clientHeight/400;

let gameOn = false;
let score = 0;

function getOrientation(direction) {
    if (direction === "right") {
        return "rotate(-90deg)";
    } else if (direction === "left") {
        return "rotate(90deg)";
    } else if (direction === "up") {
        return "rotate(180deg)";
    } else if (direction === "down") {
        return "rotate(0deg)";
    }
}

function getJointOrientation(dir1, dir2) {
    if (dir1 === "right") {
        if (dir2 === "up") {
            return "rotate(-90deg)";
        } else {
            return "rotate(180deg)";
        }
    } else if (dir1 === "left") {
        if (dir2 === "up") {
            return "rotate(0deg)";
        } else {
            return "rotate(90deg)";
        }
    } else if (dir1 === "up") {
        if (dir2 === "right") {
            return "rotate(90deg)";
        } else {
            return "rotate(180deg)";
        }
    } else if (dir1 === "down") {
        if (dir2 === "right") {
            return "rotate(0deg)";
        } else {
            return "rotate(270deg)";
        }
    }
}

class Player {
    constructor() {
        this.headImg = document.getElementById("player");
        this.tailImg = document.createElement("img");
        this.bodyImgs = [];
        this.x = gameWindow.clientWidth/2;
        this.y = gameWindow.clientHeight/2;
        this.direction = "down";
        this.moved = false;
        this.previousPositions = [];

        this.headImg.style.width = 20 * heightRatio + "px";
        this.headImg.style.height = 20 * heightRatio + "px";
        this.tailImg.src = "tail.png";
        this.tailImg.className = "snake";
        this.tailImg.style.width = 20 * heightRatio + "px";
        this.tailImg.style.height = 20 * heightRatio + "px";
    }

    move() {
        this.previousPositions.unshift({x: this.x, y: this.y, direction: this.direction, joint: this.moved});
        if (this.previousPositions.length > this.bodyImgs.length + 1) {
            this.previousPositions.pop();
        }

        if (this.direction === "right") {
            this.x += 20 * heightRatio;
        } else if (this.direction === "left") {
            this.x -= 20 * heightRatio;
        } else if (this.direction === "up") {
            this.y -= 20 * heightRatio;
        } else if (this.direction === "down") {
            this.y += 20 * heightRatio;
        }
        this.headImg.style.transform = getOrientation(this.direction);

        if (this.x < 0 || this.x > gameWindow.clientWidth - this.headImg.clientWidth || this.y < 0 || this.y > gameWindow.clientHeight - this.headImg.clientHeight) {
            gameOn = false;
        }

        this.headImg.style.left = this.x + "px";
        this.headImg.style.top = this.y + "px";
        this.tailImg.style.left = this.previousPositions[this.previousPositions.length - 1].x + "px";
        this.tailImg.style.top = this.previousPositions[this.previousPositions.length - 1].y + "px";
        this.tailImg.style.transform = getOrientation(this.previousPositions[this.previousPositions.length - 1].direction);
        for (let i = 0; i < this.bodyImgs.length; i++) {
            let bodyImg = this.bodyImgs[i];
            bodyImg.style.left = this.previousPositions[i].x + "px";
            bodyImg.style.top = this.previousPositions[i].y + "px";
            if (this.previousPositions[i].joint && this.previousPositions[i].direction !== this.previousPositions[i+1].direction) {
                bodyImg.src = "snake_joint.png";
                bodyImg.style.transform = getJointOrientation(this.previousPositions[i].direction, this.previousPositions[i+1].direction);
            } else {
                bodyImg.src = "snake_body.png";
                bodyImg.style.transform = getOrientation(this.previousPositions[i].direction);
            }
        }

        this.moved = false;
    }
}

class Apple {
    constructor() {
        this.img = document.createElement("img");
        this.img.src = "apple.png";
        this.img.className = "apple";
        this.x = Math.floor(Math.random() * (gameWindow.clientWidth - 20));
        this.y = Math.floor(Math.random() * (gameWindow.clientHeight - 20));
    }
}

let player = new Player();
gameWindow.appendChild(player.tailImg);
let apple = addApple(new Apple());
let frameCount = 0;
document.addEventListener("keydown", function(event) {
    if (gameOn) {
        if (event.key === "ArrowRight") {
            if (player.direction === "left" || player.moved) return;
            player.direction = "right";
            player.moved = true;
        } else if (event.key === "ArrowLeft") {
            if (player.direction === "right" || player.moved) return;
            player.direction = "left";
            player.moved = true;
        } else if (event.key === "ArrowUp") {
            if (player.direction === "down" || player.moved) return;
            player.direction = "up";
            player.moved = true;
        } else if (event.key === "ArrowDown") {
            if (player.direction === "up" || player.moved) return;
            player.direction = "down";
            player.moved = true;
        }
    } else {
        if (event.key === "Enter") {
            gameOn = true;
            score = 0;
            player.bodyImgs.forEach(img => gameWindow.removeChild(img));
            player.bodyImgs = [];
            gameWindow.removeChild(player.tailImg);
            gameWindow.removeChild(apple.img);
            player = new Player();
            gameWindow.appendChild(player.tailImg);
            apple = addApple(new Apple());
            frameCount = 0;
        }
    }
});

function addApple(newApple) {
    gameWindow.appendChild(newApple.img);
    newApple.img.className = "apple";
    newApple.img.style.left = newApple.x + "px";
    newApple.img.style.top = newApple.y + "px";
    newApple.img.style.width = 20 * heightRatio + "px";
    newApple.img.style.height = 20 * heightRatio + "px";

    return newApple;
}

function addBodyPart(plr) {
    let bodyPart = document.createElement("img");
    bodyPart.src = "snake_body.png";
    bodyPart.className = "snake";
    bodyPart.style.width = 20 * heightRatio + "px";
    bodyPart.style.height = 20 * heightRatio + "px";
    gameWindow.appendChild(bodyPart);
    plr.bodyImgs.push(bodyPart);
}

function checkAppleCollision(plr, apple) {
    if (plr.x < apple.x + apple.img.clientWidth &&
        plr.x + plr.headImg.clientWidth > apple.x &&
        plr.y < apple.y + apple.img.clientHeight &&
        plr.y + plr.headImg.clientHeight > apple.y) {
            return true;
        }
        return false;
}

function gameLoop() {
    if (gameOn) {
        frameCount = (frameCount + 1) % 600;
        if (frameCount % 20 === 0) {
            player.move();
        }

        if (checkAppleCollision(player, apple)) {
            console.log("Apple eaten!");
            score++;
            document.getElementById("score").innerText = 'Score : ' + score;
            gameWindow.removeChild(apple.img);
            apple = addApple(new Apple());
            addBodyPart(player);
        }
    }
}

setInterval(gameLoop, 1000/60);