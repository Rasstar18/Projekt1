'use strict'
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var x = 0;

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

    moveBlock(){
        this.x-=7;
    }
}

let ground = new Block(0,760, 1914, 184, "grey");
let block = new Block(750,690, 70, 70, "red");
let block1 = new Block(1150,690, 70, 70, "red");
let block2 = new Block(1550,690, 70, 70, "red");
let block3 = new Block(1950,690, 70, 70, "red");
let block4 = new Block(2350,690, 70, 70, "red")
let blocks = [block,block1,block2,block3,block4];

class Character{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedY = 0;
        this.gravity = 0.5;
        this.jumpSpeed = 14;
        this.land = true;
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
}



let character = new Character(500, 580, 90, 180, "green");
let jump = false;



function gameloop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < blocks.length; i++){
        blocks[i].drawBlock();
        blocks[i].moveBlock();
        if(character.x + character.width == blocks[i].x || character.y + character.height == blocks[i].y){
            console.log(character)
            alert("GAME OVER");
        }
    }
    character.drawCharacter();
    ground.drawBlock();
    character.gravitation();
  window.requestAnimationFrame(gameloop);  
}

window.onload = gameloop();

document.addEventListener('keydown', function(e){
    if(e.key == 'w'){
        jump = true;
    }
})

document.addEventListener('keyup', function(e){
    if(e.key == 'w'){
        jump = false;
    }
})