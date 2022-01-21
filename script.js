const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

//game loop
function drawGame() {
    clearScreen();
    chageSnakePosition();

    checkAppleCollistion();
    drawApple();
    drawSnake();
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
    // like a paint bruch
    ctx.fillStyle = "black";
    //draw a rectangle start at position 0, 0 and
    //make it the size of canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
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
