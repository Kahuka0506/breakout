

//all
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


canvas.style.position = "absolute";
//canvas.style.left = "30px";
canvas.style.top = "30px";




//ball
ctx.beginPath();
ctx.fillStyle = "#EABA0B";
ctx.arc(50, 50, 10, 0, Math.PI*2);
ctx.fill();
ctx.closePath();

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 3;
var dy = -3;

var ballRadius =8;


//paddle
var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var paddleSpeed = 4;


//brick
var brickRowCount = 5;
var brickColumnCount = 6;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , status: 1};
    }
}


//score
var score = 0;

//live
var lives = 4;


//keybord input
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}



//draw ball
function drawBall(){
    ctx.beginPath();
    ctx.fillStyle = "#EABA0B";
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    
}

//draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#d65f0b";
    ctx.fill();
    ctx.closePath();
}


//draw brick
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.fillStyle = "rgb(234," + Math.floor(166+r*7)  + ",11)";
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fill();
                ctx.closePath();
            }
            
        }
    }
}

//check cllision
function collisionDetection() {
    
    
    
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1){
                
                if(x >= b.x-ballRadius && x <= b.x+brickWidth+ballRadius){
                    if(y >= b.y-ballRadius && y <= b.y+brickHeight+ballRadius){
                        dy = -dy;
                        b.status = 0;
                        score++;
                        
                        if(score == brickRowCount*brickColumnCount) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            
                            drawBall();
                            drawPaddle();
                            collisionDetection();
                            drawScore();
                            drawLives();
                            
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                        
                    }
                }else if(y >= b.y-ballRadius && y <= b.y+brickWidth+ballRadius){
                    if(x >= b.x-ballRadius && x <= b.x+brickHeight+ballRadius){
                        dx = -dx;
                        b.status = 0;
                        score++;
                        
                        if(score == brickRowCount*brickColumnCount) {
                            
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            
                            drawBall();
                            drawPaddle();
                            collisionDetection();
                            drawScore();
                            drawLives();
                            
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                        
                    }
                    
                }
                
            }
            
            
        }
    }
}


//draw score
function drawScore() {
    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "#d65f0b";
    ctx.fillText("SCORE: "+score, 8, 21);
}

//draw live
function drawLives() {
    //ctx.font = "bold 18px Arial";
    //ctx.fillStyle = "#5a0094";
    //ctx.fillText("Lives: "+lives, canvas.width-75, 21);
    
    for(var i = 0; i < lives; i++){
        ctx.beginPath();
        ctx.fillStyle = "#d65f0b";
        ctx.arc(canvas.width-16-i*20, 12, 6, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

//main
function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += paddleSpeed;
    }else if(leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }


    x += dx;
    y += dy;
    
    if(x <= ballRadius || x >= canvas.width - ballRadius){
        dx = -dx;
    }
    if(y <= ballRadius){
        dy = -dy;
    }else if(y > canvas.height + 2*ballRadius){
        lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = -dx;
            dy = -dy;
            paddleX = (canvas.width-paddleWidth)/2;
        }
        
        
    }else if(y >= canvas.height-ballRadius-paddleHeight){
        if(x >= paddleX-ballRadius && x <= paddleX+paddleWidth+ballRadius){
            dy = -dy;
        }
    }else if(x >= paddleX-ballRadius && x <= paddleX+paddleWidth+ballRadius){
        if(y >= canvas.height-ballRadius-paddleHeight && y <= canvas.height-ballRadius){
            dx = -dx;
        }
    }
    
    requestAnimationFrame(draw);
    
}




draw();

