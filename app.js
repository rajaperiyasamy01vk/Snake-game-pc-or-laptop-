

const gameBoard = document.querySelector("#gameBoard");

const ctx = gameBoard.getContext("2d");             // ctx = context

const scoreText = document.querySelector("#score");

const resetBtn = document.querySelector("#reset");

let highScore = document.querySelector("#high-score-inner")

let result=0;

const gameWidth = gameBoard.width; 

const gameHeight = gameBoard.height;

const boardBackground  = "white";

const snakeColor  = "lightgreen";

const snakeBorder = "black";

const foodColor = "red";

const unitsize = 25; 

let running =false;

let xVelocity = unitsize; 

let yVelocity = 0;

let foodX;

let foodY;

let score = 0;

let snake = [

    {x:unitsize*4,y:0},

    {x:unitsize*3,y:0},

    {x:unitsize*2,y:0},

    {x:unitsize,y:0},

    {x:0,y:0},
]


window.addEventListener("keydown",changeDirection)

resetBtn.addEventListener("click",resetGame)


gamestart();  //starting function


function gamestart(){

    running = true
    
    scoreText.textContent = score

    createFood()

    drawFood();

    nextTick();
}

function nextTick(){

    if(running){

        setTimeout(()=>{

            clearBoard()

            drawFood();

            moveSnake();

            drawSnake();

            checkGmaeOver();

            nextTick();
        },150)
    }else{
        displayGmaeOver();
    }

   
     
    
}

function clearBoard(){

    ctx.fillStyle = boardBackground

    ctx.fillRect(0,0,gameWidth,gameHeight)
}

function createFood(){

    function randomFood(min,max){

        const randNum = Math.floor((Math.random()*(max-min)+min)/unitsize)*unitsize

        return randNum;
    }

    foodX = randomFood(0,gameWidth-unitsize);

    foodY = randomFood(0,gameWidth-unitsize);

    console.log(foodX +" "+ foodY)
}



function drawFood(){

    ctx.fillStyle = foodColor;

    ctx.fillRect(foodX,foodY,unitsize,unitsize)
}

function moveSnake(){

    const head = {
        x:snake[0].x + xVelocity,

        y:snake[0].y + yVelocity
    };

    snake.unshift(head);
   

    if(snake[0].x == foodX && snake[0].y == foodY ){

        score+=5;

        scoreText.textContent = score

        createFood()

    }else{
        snake.pop();
    }
}

function drawSnake(){

    ctx.fillStyle = snakeColor;

    ctx.strokeStyle = snakeBorder;

    snake.forEach((s)=>{

        ctx.fillRect(s.x,s.y,unitsize,unitsize)
   
        ctx.strokeRect(s.x,s.y,unitsize,unitsize)
   
    })
}

function changeDirection(e){   //e=>event 

const keypressed = e.keyCode;

const LEFT = 37;  

const UP = 38;

const RIGHT = 39;

const DOWN = 40;

const goingUp = (yVelocity == -unitsize)

const goingDown = (yVelocity == unitsize)

const goingRigth = (xVelocity== unitsize)

const goingLeft = (xVelocity==-unitsize)


switch(true){

    case(keypressed == LEFT && !goingRigth):
        xVelocity = -unitsize;
        yVelocity=0;
        break;

    case(keypressed == UP && !goingDown):
        xVelocity = 0;
        yVelocity=-unitsize;
        break;

    case(keypressed == RIGHT && !goingLeft):
        xVelocity = unitsize;
        yVelocity=0;
        break;

    case(keypressed == DOWN && !goingUp):
        xVelocity = 0;
        yVelocity=unitsize;
        break;
    
}

}

function checkGmaeOver(){

    switch(true){

        case(snake[0].x<0):
            running = false;
            break;

        case(snake[0].x>gameWidth):
            running = false;
            break;


        case(snake[0].y<0):
            running = false;
            break;

        case(snake[0].y>gameHeight):
            running = false;
            break;

    }

    for(let i=1;i<snake.length;i++){
      
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
         
            running=false
       
        }
    }

}

function displayGmaeOver(){

    ctx.font = "50px MV Boli";

    ctx.fillStyle = "black";
    
    ctx.textAlign = "center";

    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
   
    running = false;

    

}





function resetGame(){ 

    if(result<score){
        result = score
        highScore.innerHTML = result;
  
    }else{
        highScore.innerText = result;
    }

    
    score=0;

    xVelocity=unitsize;

    yVelocity= 0;

    snake = [

        {x:unitsize*4,y:0},
    
        {x:unitsize*3,y:0},
    
        {x:unitsize*2,y:0},
    
        {x:unitsize,y:0},
    
        {x:0,y:0},            
    ]

    gamestart();

}



//disable arrow key scroll

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);







//nav

let  nav = document.querySelector(".nav-rigth")
let navItem = nav.querySelectorAll("div")


let  rules = document.querySelector(".rules-con");
let contact = document.querySelector(".contact-con");
let  help = document.querySelector(".help-con");


    navItem.forEach((x,i)=>{

        x.addEventListener("click",()=>{

        help.style.display="none"
        contact.style.display="none"
        rules.style.display="none"


            if(i==0){
                rules.style.display="block"
    
                let rulesvg = rules.querySelector("svg");
                rulesvg.addEventListener("click",()=>{
                    rules.style.display="none"
                })
            }
    
            else if(i==1){
               contact.style.display="block"
    
                let rulesvg = contact.querySelector("svg");
                rulesvg.addEventListener("click",()=>{
                    contact.style.display="none"
                })
            }
    
             else if(i==2){
               help.style.display="block"
    
                let rulesvg = help.querySelector("svg");
                rulesvg.addEventListener("click",()=>{
                    help.style.display="none"
                })
            }
    
    
        })
    })

