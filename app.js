const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle='yellow';

const cs=50;
let food=null;
 let score=0;
let initial_x=50;
let initial_y=100;
const W=700;
const H=500;
// create snake object
const snake={
    init_len:5,
    direction:'right',
    cells:[],
    // create snake function for snake creation
    createSnake:function(){
        for(let i=0;i<this.init_len;i++){
           this.cells.push({
               x:i,
               y:0
           }) 
        }
    },
//draaw the snake by below function
drawSnake:function() {
    for(let cell of this.cells){
       pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2) ;
    }
},
// update snake position by this function
updateSnake:function(){
const headX=this.cells[this.cells.length-1].x;
const headY=this.cells[this.cells.length-1].y;
// collision of food and snake
if(headX===food.x && headY===food.y){
food=getRandomFood();

}else{
    this.cells.shift();
}

let nextX,nextY;
// getting snake coordinate for change the direction 
//of snake
if(this.direction=='up'){
nextX=headX;
nextY=headY-1;
if(nextY*cs<0){
    clearInterval(id);
    pen.fillStyle='lightgreen';
    pen.fillText('Game Over',50,100);
}

}
else if(this.direction=='down'){
    nextX=headX;
    nextY=headY+1;
    if(nextY*cs>H){
        clearInterval(id);
        pen.fillStyle='lightgreen';
        pen.fillText('Game Over',50,100);
    }
    
    }
    else if(this.direction=='left'){

   nextX=headX-1;
   nextY=headY;
   if(nextX*cs<0){
    clearInterval(id);
    pen.fillStyle='lightgreen';
    pen.fillText('Game Over',50,100);
}
    }
    else{
        nextX=headX+1;
        nextY=headY;
        if(nextX*cs>=W){
            clearInterval(id);
            pen.fillStyle='lightgreen';
            pen.fillText('Game Over',50,100);
        }
    }




this.cells.push({
    x:nextX,
    y:nextY
})
}
}
//initialize the game


function init(){
    snake.createSnake();
food=getRandomFood();

pen.fillText(`Score ${score}`,50,50);
    // function for changing snake direction
    function keypressed(e){
        // console.log(e);
        // console.log('keypressed');

if(e.key==='ArrowDown'){
snake.direction='down';
}
else if(e.key=='ArrowUp'){
snake.direction='up';
}else if(e.key==='ArrowLeft'){
    snake.direction='left';
}else{
    snake.direction='right';
}



 }
    

    document.addEventListener('keydown',keypressed);
}



//draw game

function draw(){
    pen.clearRect(0,0,W,H);
    pen.font='40px san-serif';

    pen.fillText(`Score ${score}`,50,50);
 
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
  pen.fillStyle='blue';
   
    snake.drawSnake(); 
    pen.fillStyle='yellow';   
}


// update the game

function update(){
snake.updateSnake();
}

//game loop
function gameLoop(){

    draw();
    update();
}
function getRandomFood(){

const foodX=Math.floor(Math.random()*(W-cs)/cs);
const foodY=Math.floor(Math.random()*(H-cs)/cs);


const food={

    x:foodX,
    y:foodY


}
return food;
}
init();// first initializing the game;


// creating id object for controling the gameover function and speed of snake; 


const id=setInterval(gameLoop,150);// iterate gameloop afetr some interval; 
