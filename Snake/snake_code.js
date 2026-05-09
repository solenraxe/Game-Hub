let gameWindow = document.getElementById("game-window");
const heightRatio = gameWindow.clientHeight/400;

gameWindow.style.width = gameWindow.clientHeight + "px";

let gameOn = false;
let score = 0;

let grid = [];
for (let i = 0; i < 20; i++) {
    grid[i] = [];
    for (let j = 0; j < 20; j++) {
        grid[i][j] = {x: i * 20 * heightRatio, y: j * 20 * heightRatio, occupied: false};
    }
}

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
        this.newImg = null;
        this.x = 10;
        this.y = 10;
        this.direction = "down";
        this.moved = false;
        this.previousPositions = [];

        this.headImg.style.width = 20 * heightRatio + "px";
        this.headImg.style.height = 20 * heightRatio + "px";
        this.tailImg.src = "assets/tail.png";
        this.tailImg.className = "entity";
        this.tailImg.style.width = 20 * heightRatio + "px";
        this.tailImg.style.height = 20 * heightRatio + "px";
    }

    move() {
        this.previousPositions.unshift({x: this.x, y: this.y, direction: this.direction, joint: this.moved});
        if (this.previousPositions.length > this.bodyImgs.length + 1) {
            this.previousPositions.pop();
        }

        if (this.direction === "right") {
            this.x += 1;
        } else if (this.direction === "left") {
            this.x -= 1;
        } else if (this.direction === "up") {
            this.y -= 1;
        } else if (this.direction === "down") {
            this.y += 1;
        }

        if (this.x < 0 || this.x >= 20 || this.y < 0 || this.y >= 20 || grid[this.x][this.y].occupied) {
            gameOn = false;
            return;
        }

        this.headImg.style.left = grid[this.x][this.y].x + "px";
        this.headImg.style.top = grid[this.x][this.y].y + "px";
        this.headImg.style.transform = getOrientation(this.direction);
        grid[this.x][this.y].occupied = true;

        let tailPos = this.previousPositions[this.previousPositions.length - 1];
        this.tailImg.style.left = grid[tailPos.x][tailPos.y].x + "px";
        this.tailImg.style.top = grid[tailPos.x][tailPos.y].y + "px";
        this.tailImg.style.transform = getOrientation(this.previousPositions[this.previousPositions.length - 1].direction);
        grid[tailPos.x][tailPos.y].occupied = false;
       
        for (let i = 0; i < this.bodyImgs.length; i++) {
            let bodyImg = this.bodyImgs[i];
            let pos = this.previousPositions[i];
            bodyImg.style.left = grid[pos.x][pos.y].x + "px";
            bodyImg.style.top = grid[pos.x][pos.y].y + "px";
            if (this.previousPositions[i].joint && this.previousPositions[i].direction !== this.previousPositions[i+1].direction) {
                bodyImg.src = "assets/snake_joint.png";
                bodyImg.style.transform = getJointOrientation(this.previousPositions[i].direction, this.previousPositions[i+1].direction);
            } else {
                bodyImg.src = "assets/snake_body.png";
                bodyImg.style.transform = getOrientation(this.previousPositions[i].direction);
            }
        }

        if (this.newImg !== null) {
            gameWindow.appendChild(this.newImg);
            this.newImg = null;
        }

        this.moved = false;
    }
}

class Apple {
    constructor() {
        this.img = document.createElement("img");
        this.img.src = "assets/apple.png";
        this.img.className = "entity";
        this.x = Math.floor(Math.random() * 20);
        this.y = Math.floor(Math.random() * 20);
    }
}

let player = null;
let apple = null;
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
            document.getElementById("score").innerText = 'Score : ' + score;
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    grid[i][j].occupied = false;
                }
            }
            if (player !== null) {
                player.bodyImgs.forEach(img => gameWindow.removeChild(img));
                player.bodyImgs = [];
                gameWindow.removeChild(player.tailImg);
                gameWindow.removeChild(apple.img);
            }
            player = new Player();
            gameWindow.appendChild(player.tailImg);
            apple = addApple(new Apple());
        }
    }
});

function addApple(newApple) {
    gameWindow.appendChild(newApple.img);
    while (grid[newApple.x][newApple.y].occupied) {
        newApple.x = Math.floor(Math.random() * 20);
        newApple.y = Math.floor(Math.random() * 20);
    }
    newApple.img.className = "entity";
    newApple.img.style.left = grid[newApple.x][newApple.y].x - 2.5 * heightRatio + "px";
    newApple.img.style.top = grid[newApple.x][newApple.y].y - 2.5 * heightRatio + "px";
    newApple.img.style.width = 25 * heightRatio + "px";
    newApple.img.style.height = 25 * heightRatio + "px";

    return newApple;
}

function addBodyPart(plr) {
    let bodyPart = document.createElement("img");
    bodyPart.src = "assets/snake_body.png";
    bodyPart.className = "entity";
    bodyPart.style.width = 20 * heightRatio + "px";
    bodyPart.style.height = 20 * heightRatio + "px";
    plr.bodyImgs.push(bodyPart);
    plr.newImg = bodyPart;
}

function checkAppleCollision(plr, apple) {
    if (plr.x === apple.x && plr.y === apple.y) {
        return true;
    } else {
        return false;
    }
}

function gameLoop() {
    if (gameOn && score < 398) {
        player.move();

        if (checkAppleCollision(player, apple)) {
            score++;
            if (score >= 398) {
                 gameOn = false;
            }
            document.getElementById("score").innerText = 'Score : ' + score;
            gameWindow.removeChild(apple.img);
            apple = addApple(new Apple());
            addBodyPart(player);
        }
    }
}

setInterval(gameLoop, 1000/6);
