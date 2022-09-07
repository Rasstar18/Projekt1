'use strict'
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

let background = new Image();
background.src = "The_Griffin_House.png";


let fast = 0;
let speed = 0;


//***************************************************************************************
class Block{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    drawBlock(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    imageBlock(){
        var stone = new Image();
        stone.src = "stone.png";
        ctx.drawImage(stone,this.x + 5,this.y + 5,this.width,this.height);
    }
    moveBlock(){
        if(fast == 25){
            speed += 1;
            fast = 0;
        }
        if(speed < 25){
            this.x-=10;  
        }
        if(speed < 50 && speed >= 25){
            this.x-=11;  
        }
        if(speed < 75 && speed >= 50){
            this.x-=12;  
        }
        if(speed < 100 && speed >= 75){
            this.x-=13;  
        }
        if(speed < 125 && speed >= 100){
            this.x-=14;  
        }
        if(speed < 150 && speed >= 125){
            this.x-=15;  
        }
        if(speed < 175 && speed >= 150){
            this.x-=16;  
        }
        if(speed < 200 && speed >= 175){
            this.x-=17;  
        }
        if(speed < 225 && speed >= 200){
            this.x-=18;  
        }
        if(speed < 250 && speed >= 225){
            this.x-=19;  
        }
        if(speed < 275 && speed >= 250){
            this.x-=20;  
        }
        if(speed < 300 && speed >= 275){
            this.x-=21;  
        }
        if(speed < 325 && speed >= 300){
            this.x-=22;  
        }
        if(speed < 350 && speed >= 325){
            this.x-=23;  
        }
        if(speed < 375 && speed >= 350){
            this.x-=24;  
        }
        if(speed < 400 && speed >= 375){
            this.x-=25;  
        }
    }    
}

let ground = new Block(0,760, 1914, 184, "lightgrey");


let blocks;
function generateObstacles(){
    let xPos = 500;
    blocks = [];

    for(let a=0;a<500;a++) {
        let distance = Math.floor((Math.random() * 700) + 500)
        xPos += distance;
        blocks.push(new Block(xPos,700,60,60)); 
    }
}

//*********************************************************************************************
class Coin{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    drawCoin(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    MoveCoin(){
        if(fast == 25){
            speed += 1;
            fast = 0;
        }
        if(speed < 25){
            this.x-=10;  
        }
        if(speed < 50 && speed >= 25){
            this.x-=11;  
        }
        if(speed < 75 && speed >= 50){
            this.x-=12;  
        }
        if(speed < 100 && speed >= 75){
            this.x-=13;  
        }
        if(speed < 125 && speed >= 100){
            this.x-=14;  
        }
        if(speed < 150 && speed >= 125){
            this.x-=15;  
        }
        if(speed < 175 && speed >= 150){
            this.x-=16;  
        }
        if(speed < 200 && speed >= 175){
            this.x-=17;  
        }
        if(speed < 225 && speed >= 200){
            this.x-=18;  
        }
        if(speed < 250 && speed >= 225){
            this.x-=19;  
        }
        if(speed < 275 && speed >= 250){
            this.x-=20;  
        }
        if(speed < 300 && speed >= 275){
            this.x-=21;  
        }
        if(speed < 325 && speed >= 300){
            this.x-=22;  
        }
        if(speed < 350 && speed >= 325){
            this.x-=23;  
        }
        if(speed < 375 && speed >= 350){
            this.x-=24;  
        }
        if(speed < 400 && speed >= 375){
            this.x-=25;  
        } 
    }
}


let coins;

function generateCoins(){
    let xPosition = 2000;
    coins = [];

    for(let c=0;c<500;c++) {
        let dis = Math.floor((Math.random() * 3500) + 2000)
        xPosition += dis;
        coins.push(new Coin(xPosition, 500, 30, 30, "#FFDF00")); 
    }
}

let point = 0;
let xLife = 0;
let pointCheck = 0;
let coin = false;

function extraLife(){
    ctx.font = "70px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Points: "+point,1750,70);

    for(let p=0; p<coins.length; p++){
        coins[p].drawCoin();
        coins[p].MoveCoin();

        if(collision(coins[p])){
            coins.splice(0,1);
            point += 1;
        }
    }

    if(point >= 10){
        coin = true;
        ctx.font = "20px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Press P for an extra life", 1750, 100);
    }

    if(xLife >= 0){
        ctx.font = "70px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Extra lives: "+xLife,200,70);
    }
}
//**************************************************************************
let count = 0;
let check = 0;

let playerAlive = true;


class Character{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedY = 0;
        this.gravity = 0.6;
        this.jumpSpeed = 14;
        this.color = color;
        this.land = true;
        this.frame = new Image();
    }
    drawCharacter(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        
    }
    jumpCharacter(){
        if(this.land){
            this.speedY = -this.jumpSpeed;
            this.land = false; 
        }
    }
    gravitation(){
        if(!this.land){
            this.speedY += this.gravity;
        }
        if(this.y + this.height >= 760){
            this.speedY = 0;
            this.land = true;
        }
        if(jump){
            this.jumpCharacter();
        }
        this.y += this.speedY; 
    }
    updateAnimation(){
        if(count == 4){
            check += 1;
            count = 0;
        }

        if(check == 13) {
            check = 0;
        }

        this.frame = animation[check];
    }
    draw() {
        let lengthy = 35;
        let lengthw = 60;
        let h = this.height + 50;
        let w = this.width + 125;
        ctx.drawImage(this.frame,this.x - lengthw,this.y - lengthy, w, h); 
    }
}

let character = new Character(250, 630, 100, 140, "green");
let jump = false;

//***********************************************************************
let animation = [];
for(let b=1; b<14; b++) {
    let frame = new Image();
    frame.src = "peter"+b+".png";
    animation.push(frame);
}

function collision(b){
    if(character.x <= b.x + b.width &&
        character.x + character.width >= b.x &&
        character.y <= b.y + b.height &&
        character.height + character.y >= b.y){
            return true;
        }
    else {
        return false;
    }
}

//************************************************************************************
let control = 0;
let score = 0;
let highscore = {};
let list = [];


function drawScore(){
    if(control == 30){
        score+=1;
        control = 0;
    }
    
    ctx.font = "80px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(score,850,70);

    highscore = {score: score};
    list.push(highscore);
    list.sort(function(a, b){ return (b.score - a.score)}); 

    
}

//***************************************************************************************
let pause = false;

function gameloop(){
    if(pause){ 
        count++; 
        control++;
        fast++;
        
        character.updateAnimation(); 
        character.gravitation();
    
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(background,0,0,1914,927);  
        ground.drawBlock();
        character.draw();

        drawScore();
        extraLife();

        
        for(let i=0; i<blocks.length; i++){
            blocks[i].moveBlock();
            blocks[i].imageBlock();

            if(collision(blocks[i]) && xLife == -1){
                playerAlive = false;
            }  
            
            
            if(collision(blocks[i]) && xLife >= 0){
                pointCheck += 1;
                playerAlive = true;
                if(pointCheck >= 10){
                   xLife -= 1;
                   pointCheck = 0;  
                }  
            } 
        }
        console.log(xLife);
    } 
        

    if(!pause){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(background,0,0,1914,927);
        ctx.font = "30px Arial";
        ctx.fillText("Press K to start", 950, 80); 
        ctx.textAlign = "center";  
    }   

    if(playerAlive) {
        window.requestAnimationFrame(gameloop); 
    }

    else if(!playerAlive){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        window.cancelAnimationFrame(gameloop);
        ctx.font = "90px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width/2, 70);
        ctx.fillText("Press R to restart", canvas.width/2, 910);
        ctx.fillText("High-score: "+list[0].score, canvas.width/2, 200);
        ctx.font = "10px Arial";
    }
}


//************************************************************************************
window.onload = function(){
    start();
};

function start(){
    playerAlive = true;
    generateObstacles();
    generateCoins();
    window.requestAnimationFrame(gameloop);
}


function restart(){
    score = 0;
    fast = 0;
    speed = 0;
    point = 0;
    xLife ++;
    start();
}  


//********************************************************************************************
document.addEventListener('keydown', function(e){
    if(e.key == 'r'){
        if(!playerAlive) {
            restart();
            control = 0;
        }
    }
})   

document.addEventListener('keydown', function(e){
    if(e.key == 'w' || e.key == "ArrowUp" || e.key == " "){
        jump = true;
    }
})

document.addEventListener('keyup', function(e){
    if(e.key == 'w' || e.key == "ArrowUp" || e.key == " "){
        jump = false;
    }
})

document.addEventListener('keydown', function(e){
    if(e.key == 'k'){
        pause = true;
    }
})
document.addEventListener('keydown', function(e){
    if(e.key == 'p'){
        if(coin){
            xLife += 1;
            point -= 10;
            coin = false;  
        }
    }
})