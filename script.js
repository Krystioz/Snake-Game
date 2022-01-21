const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//game loop
function drawGame() {
    chageSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();

    checkAppleCollistion();
    drawApple();
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    //walls
    if (headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    } else if (headY === 20) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over !", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
    // like a paint bruch
    ctx.fillStyle = "black";
    //draw a rectangle start at position 0, 0 and
    //make it the size of canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "green";

    //draw snakeparts
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(
            part.x * tileCount,
            part.y * tileCount,
            tileSize,
            tileSize
        );
    }
    //constantly create new snakeparts but dont increment tail length
    //if drawn more snakeparts than the tail length, remove last last part constantly
    snakeParts.push(new SnakePart(headX, headY));
    //put the item at the end of the list next to the head
    //behind the scenes it always removes the extra tail item if it exceeds tailLength
    if (snakeParts.length > tailLength) {
        snakeParts.shift(); // remove the furthest item from the snake parts
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileCount, tileCount);
}

// function keydown continously adds or substracts headX and HeadY changing
// the snakes position
function chageSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileCount, tileCount);
}

function checkAppleCollistion() {
    if (appleX === headX && appleY === headY) {
        //random position within canvas tiles
        appleX = Math.floor(Math.random() * 20);
        appleY = Math.floor(Math.random() * 20);
        tailLength++;
        score++;
    }
}

document.body.addEventListener("keydown", keydown);

function keydown(event) {
    //each keyboard key has its code
    // up key
    if (event.keyCode == 38) {
        //you cant move up if you arleady go down
        //you would crash your body
        if (yVelocity == 1) {
            return;
        }
        //because you move higher from the center
        yVelocity = -1;
        //because you dont move left/right
        xVelocity = 0;
    }
    //down
    if (event.keyCode == 40) {
        //cant move down if arleady moving up
        if (yVelocity == -1) {
            return;
        }
        // bcs move down
        yVelocity = 1;
        xVelocity = 0;
    } //left
    if (event.keyCode == 37) {
        if (xVelocity == 1) {
            return;
        }
        // bcs move down
        yVelocity = 0;
        xVelocity = -1;
    } //right
    if (event.keyCode == 39) {
        if (xVelocity == -1) {
            return;
        }
        // bcs move down
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
