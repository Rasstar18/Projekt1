'use strict'
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");


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
let block = new Block(750,700, 60, 60, "red");
let block1 = new Block(1150,700, 60, 60, "red");
let block2 = new Block(1550,700, 60, 60, "red");
let block3 = new Block(1950,700, 60, 60, "red");
let block4 = new Block(2350,700, 60, 60, "red")
let blocks = [block,block1,block2,block3,block4];

let count = 0;
let check = 0;

class Character{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedY = 0;
        this.gravity = 0.5;
        this.jumpSpeed = 14;
        this.land = true;
    }

    drawCharacter(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
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
    movingCharacter(){
        if(count == 30){
            check += 1
            count = 0;
        }
        console.log(count);
        console.log(check);
        if(check == 1){
            var peter1 = new Image();
            peter1.src = "Peter 2.png";
            ctx.drawImage(peter1,this.x - 65,this.y + 20,this.width,this.height);  
        }
        if(check ==  2){
            var peter2 = new Image();
            peter2.src = "Peter 1.png"; 
            ctx.drawImage(peter2,this.x - 15,this.y + 20,this.width,this.height); 
        }
        if(check == 3){
            var peter3 = new Image();
            peter3.src = "Peter 3.png"; 
            ctx.drawImage(peter3,this.x - 15,this.y + 20,this.width,this.height); 
        }
        if(check == 4){
            var peter3 = new Image();
            peter3.src = "Peter 1.png"; 
            ctx.drawImage(peter3,this.x - 15,this.y + 20,this.width,this.height);
        }
        if(check == 5){
            var peter3 = new Image();
            peter3.src = "Peter 1.png"; 
            ctx.drawImage(peter3,this.x - 100,this.y + 20,this.width,this.height);
            check = 1; 
        }
    }
}



let character = new Character(200, 580, 100, 180);
let jump = false;

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
    
let pause = true;



function gameloop() {
    if(pause){ 
        ctx.clearRect(0,0,canvas.width,canvas.height);
        var background = new Image();
        background.src = "The_Griffin_House.png";
        ctx.drawImage(background,0,0,1914,927);  
        
        for(var i = 0; i < blocks.length; i++){
        
        blocks[i].drawBlock();
        blocks[i].moveBlock();
        if(collision(blocks[i])) {
                pause = false;
            } 
        } 
        //character.drawCharacter();
        character.movingCharacter(); 

        
        ground.drawBlock();
        character.gravitation();
        count++;
        window.requestAnimationFrame(gameloop);
    }
    if(!pause){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }     
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