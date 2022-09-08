'use strict'
//Kanvasen skapas
var canvas = document.getElementById("Canvas"); 
var ctx = canvas.getContext("2d");

let background = new Image();
background.src = "The_Griffin_House.png";

//Variabler för hastigheten av mynten och stenarna
let fast = 0;
let speed = 0;


//***************************************************************************************
class Block{
    //Objektets storlek och färg
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    //Detta fyller i objektets färg
    drawBlock(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    //En bild läggs på objektet
    imageBlock(){
        var stone = new Image();
        stone.src = "stone.png";
        ctx.drawImage(stone,this.x + 5,this.y + 5,this.width,this.height);
    }
    //Objektet förflyttar sig utifrån en timer
    moveBlock(){
        if(fast == 25){  //Om timern för variabeln fast når 25, så återställs den timern och det läggs på ett värde på variabeln speed
            speed += 1;
            fast = 0;
        }
        //Ifall värdet på variablen speed är under eller över/samma som ett visst värde, ändras hastigheten på stenarna
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


//Det genereras 500 objekt, och det ritas ut slumpmässigt på kanvasen mellan avstånden 550px och 650px;
let blocks;
function generateObstacles(){ 
    let xPos = 500;
    blocks = [];

    for(let a=0;a<500;a++) {
        let distance = Math.floor((Math.random() * 650) + 550)
        xPos += distance;
        blocks.push(new Block(xPos,700,60,60)); 
    }
}

//*********************************************************************************************
class Coin{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
  
    /*drawCoin(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }*/
    
    imageCoin(){
        var coinPng = new Image();
        coinPng.src = "Coin.png";
        ctx.drawImage(coinPng,this.x+8,this.y-2,this.width+5,this.height+5);
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

    for(let c=0;c<250;c++) {
        let dis = Math.floor((Math.random() * 350) + 200)
        xPosition += dis;
        coins.push(new Coin(xPosition, 500, 30, 30)); 
    }
}


//**************************************************************************
//Varje gång som man kolliderar med ett mynt så försvinner den och det läggs ett värde på "Coins", och ifall man tjänar ihop minst 10 mynt kan man börja att köpa saker
let point = 0;
let xLife = 0;
let pointCheck = 0;
let coin = false;

function pointSystem(){
    ctx.font = "70px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Coins: "+point,1750,70);

    for(let p=0; p<coins.length; p++){
        coins[p].MoveCoin();
        coins[p].imageCoin();

        if(collision(coins[p])){
            coins.splice(0,1);
            point += 1;
        }
    }

    //Om man har samlat ihop minst 10 mynt kan man köpa ett extra liv
    if(point >= 10){
        coin = true;
        ctx.font = "20px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Press Q for an extra life", 1750, 100);
    }

    //Om man har samlat ihop minst 15 mynt kan man göra ett super jump
    if(point >= 15){
        coin = true;
        ctx.font = "20px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Press E for a super jump", 1750, 130);
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
    //Karaktären "flyger" upp i luften
    jumpCharacter(){
        if(this.land){
            this.speedY -= this.jumpSpeed;
            this.land = false; 
        }
    }
    //Karaktären "dras" ned när den når en viss punkt i kanvasen och hoppmomentet är över
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
    //Animerar 14 bilder till en rörelse för karaktären
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
    //Placerar den skapade animation på "karaktärformen"
    draw(){
        let lengthy = 35;
        let lengthw = 60;
        let h = this.height + 50;
        let w = this.width + 125;
        ctx.drawImage(this.frame,this.x - lengthw,this.y - lengthy, w, h); 
    }
}

let character = new Character(250, 630, 100, 140, "green");
let jump = false; //Hoppmomentet är falsk i början

//***********************************************************************
let animation = [];
//14 bilder läggs in i en lista som sedan körs igenom i animationsfunktionen
for(let b=1; b<14; b++) {
    let frame = new Image();
    frame.src = "peter"+b+".png";
    animation.push(frame);
}

//Om karaktären kolliderar med ett visst objekt, ska den reagera på det
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

//Denna funktion håller koll på avståndsräknaren
function drawScore(){
    //När timern når 30, ska den återställas till 0 samtidigt som det läggs på ett värde i avståndsräknaren
    if(control == 30){
        score+=1;
        control = 0;
    }
    
    //Avståndsräknaren visar sitt nuvarande värde
    ctx.font = "80px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(score,850,70);

    //Det högsta värdet som Avståndsräknaren har fått medans gameloopen körs, läggs till i en lista
    highscore = {score: score};
    list.push(highscore);
    list.sort(function(a, b){ return (b.score - a.score)}); 

    
}

//***************************************************************************************
let pause = false;

//Spelet startas 
function gameloop(){
    //Ifall booleanen är sann, ska spelet köras
    if(pause){ 
        //Alla räknare börjar att köras
        count++; 
        control++;
        fast++;
        
        //Karaktärens egenskaper utförs
        character.updateAnimation(); 
        character.gravitation();
        
    
        //Bakgrundsbilden ritas ut i kanvasen tillsammans med marken (ground)
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(background,0,0,1914,927);  
        ground.drawBlock();

        character.draw();
        
        //Avständsräknaren och funktionen för extralivet utförs
        drawScore();
        pointSystem();

        //Stenarna ritas ut och kollideringsfunktionen utförs
        for(let i=0; i<blocks.length; i++){
            blocks[i].moveBlock();
            blocks[i].imageBlock();

            //Om karaktären kolliderar med sten utan något extraliv förlorar man
            if(collision(blocks[i]) && xLife == -1){
                playerAlive = false;
            }  
            
            //Samma som innan, fast om man har minst 1 extraliv blir man av med ett. Men man får fortsätta på sitt spel  
            if(collision(blocks[i]) && xLife >= 0){
                pointCheck += 1;
                playerAlive = true;
                if(pointCheck >= 10){
                   xLife -= 1;
                   pointCheck = 0;  
                }  
            } 
        }
    } 
        
    //Ifall booleanen inte är sann, ska spelet vara nollställt 
    if(!pause){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(background,0,0,1914,927);
        ctx.font = "30px Arial";
        ctx.fillText("Press K to start", 950, 80); 
        ctx.textAlign = "center";  
    }   

    //Om karaktären är vid liv ska spelet vara igång
    if(playerAlive) {
        window.requestAnimationFrame(gameloop); 
    }

    //Om karaktären är död ska spelet stanna och man trycka på en knapp för att kunna köra igen
    else if(!playerAlive){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        window.cancelAnimationFrame(gameloop);
        ctx.font = "90px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width/2, 70);
        ctx.fillText("Press R to restart", canvas.width/2, 910);
        ctx.fillText("High-score: "+list[0].score, canvas.width/2, 200); //Listan med högsta värdet från avståndsräknaren visas upp på kanvasen 
        ctx.font = "10px Arial";
    }
}


//************************************************************************************
//Funktionen start körs upp på hemsidan
window.onload = function(){
    start();
};

//Spelet startas och alla stenar och mynt börjar att genereras
function start(){
    playerAlive = true;
    generateObstacles();
    generateCoins();
    window.requestAnimationFrame(gameloop);
}

//Spelt återgår till start, och alla räknare/timers nollställs (förutom extraliven som har samma värden även när man startar om) 
function restart(){
    score = 0;
    fast = 0;
    speed = 0;
    point = 0;
    control = 0;
    xLife ++;
    start();
}  


//********************************************************************************************
//Om man klickar på R startar restart functionen
document.addEventListener('keydown', function(e){
    if(e.key == 'r'){
        if(!playerAlive) {
            restart();
        }
    }
})   

//Klickar man på w, pil upp eller mellanslag börjar karaktären att hoppa
document.addEventListener('keydown', function(e){
    if(e.key == 'w' || e.key == "ArrowUp" || e.key == " "){
        jump = true;
    }
})

//Släpper man taget om någon av ovanståendeknappar slutar karaktären att hoppa och dess gravitation drar ner karaktären till ursprungspositionen
document.addEventListener('keyup', function(e){
    if(e.key == 'w' || e.key == "ArrowUp" || e.key == " "){
        jump = false;
    }
})

//Klickar man på k startas spelet när pause booleanen inte är sann
document.addEventListener('keydown', function(e){
    if(e.key == 'k'){
        pause = true;
    }
})

//Klickar man på q får man ett extraliv och det dras av 10 mynt (om man har minst 10 mynt)
document.addEventListener('keydown', function(e){
    if(e.key == 'q'){
        if(coin && point >= 10){
            xLife += 1;
            point -= 10;
            coin = false;  
        }
    }
})

//Klickar man på e hoppar man extra högt
document.addEventListener('keydown', function(e){
    if(e.key == 'e'){
        if(coin && point >= 15){
            character.jumpSpeed = 44;
            jump = true;
            point -= 15;
            coin = false;  
        }
    }
})

//Släpper man på e knappen återgår hoppet till vanlig höjd
document.addEventListener('keyup', function(e){
    if(e.key == 'e'){
        character.jumpSpeed = 14;
        jump = false;
    }
})