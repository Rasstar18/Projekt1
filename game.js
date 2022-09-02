'use strict'
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var again;

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

let xPos = 500;
let blocks = [];
for(let a=0;a<150;a++) {
    let distance = Math.floor((Math.random() * 500) + 300)
    xPos += distance;
    blocks.push(new Block(xPos,700,60,60,"red"));
}

let count = 0;
let check = 0;

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
    movingCharacter(){
        let length = 10;
        //let wide = 30;
        if(count == 4){
            check += 1
            count = 0;
        }
        if(check == 1){
            var peter1 = new Image();
            peter1.src = "Peter1.png";
            ctx.drawImage(peter1,this.x ,this.y + length,this.width,this.height);  
        }
        if(check ==  2){
            var peter2 = new Image();
            peter2.src = "Peter2.png"; 
            ctx.drawImage(peter2,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 3){
            var peter3 = new Image();
            peter3.src = "Peter3.png"; 
            ctx.drawImage(peter3,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 4){
            var peter4 = new Image();
            peter4.src = "Peter4.png"; 
            ctx.drawImage(peter4,this.x ,this.y + length,this.width,this.height);
        }
        if(check == 5){
            var peter5 = new Image();
            peter5.src = "Peter5.png"; 
            ctx.drawImage(peter5,this.x,this.y + length,this.width,this.height);
        }
        if(check == 6){
            var peter6 = new Image();
            peter6.src = "Peter6.png"; 
            ctx.drawImage(peter6,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 7){
            var peter7 = new Image();
            peter7.src = "Peter7.png"; 
            ctx.drawImage(peter7,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 8){
            var peter8 = new Image();
            peter8.src = "Peter8.png"; 
            ctx.drawImage(peter8,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 9){
            var peter9 = new Image();
            peter9.src = "Peter9.png"; 
            ctx.drawImage(peter9,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 10){
            var peter10 = new Image();
            peter10.src = "Peter10.png"; 
            ctx.drawImage(peter10,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 11){
            var peter11 = new Image();
            peter11.src = "Peter11.png"; 
            ctx.drawImage(peter11,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 12){
            var peter12 = new Image();
            peter12.src = "Peter12.png"; 
            ctx.drawImage(peter12,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 13){
            var peter13 = new Image();
            peter13.src = "Peter13.png"; 
            ctx.drawImage(peter13,this.x ,this.y + length,this.width,this.height); 
        }
        if(check == 14){
            var peter14 = new Image();
            peter14.src = "Peter1.png"; 
            ctx.drawImage(peter14,this.x ,this.y + length,this.width,this.height); 
            check = 1;
        }
    }
}



let character = new Character(250, 630, 100, 140, "green");
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
let start = false;
let restart = false;

function gameloop() {
    //again = undefined;
    if(start){
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
        
            character.drawCharacter();
            character.movingCharacter(); 

            
            ground.drawBlock();
            character.gravitation();
            count++;
            window.requestAnimationFrame(gameloop);
        }
        if(!pause){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.font = "90px Arial";
            ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Press R to restart", canvas.width/2, 80);
            ctx.font = "10px Arial";
            ctx.fillStyle = "red";
        }  
    }
    if(!start){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var background = new Image();
            background.src = "The_Griffin_House.png";
            ctx.drawImage(background,0,0,1914,927);
            ctx.font = "30px Arial";
            ctx.fillText("Press K to start", 800, 80);
            window.requestAnimationFrame(gameloop);
    } 
    if(restart){
        return(!start);
    }    
}

window.onload = gameloop();

/*unction start(){
    if(!again){
        again = window.requestAnimationFrame(gameloop);
    }
}

function stop(){
    if(again){
        window.cancelAnimationFrame(again);
        again = undefined;
    }
}*/



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

document.addEventListener('keydown', function(e){
    if(e.key == 'k'){
        start = true;
    }
})
document.addEventListener('keydown', function(e){
    if(e.key == 'r'){
        restart = true;
    }
})
