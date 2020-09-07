const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const appleImg = new Image();
appleImg.src = "apple.png";
const background = new Image();
background.src = "green2.png";
const maxHeight = canvas.height;
const maxWidth = canvas.width;
const size = 32;
document.addEventListener('keydown',changeDiraction);
let dir;
function changeDiraction(e){
	if(e.key == 'ArrowRight' && dir != "left"){
		dir = "right";
	}
	if(e.key == 'ArrowLeft' && dir != "right"){
		dir = "left";
	}
	if(e.key == 'ArrowUp' && dir != "down"){
		dir = "up";
	}
	if(e.key == 'ArrowDown' && dir != "up"){
		dir = "down";
	}
}


let check;
class Game{
	static score = 0;
	constructor(snake){
		this.snake = snake;
		this.apple = {
			
			x: Math.round(Math.random()*11+1) * size,
			y: Math.round(Math.random()*11+1) * size
		};
	}
	drawGame(){
		ctx.drawImage(background,0,0);
		ctx.drawImage(appleImg,this.apple.x,this.apple.y);
		Game.countScore();
		ctx.fillStyle = "white";
    	ctx.font = "italic bold 40px normal";
    	ctx.fillText("Score: ",2,1.6*size);
    	ctx.fillText(Game.score,3.5*size,1.6*size);
		this.snake.drawSnake(ctx,this.apple);
		this.snake.move();
    	
	}
	static countScore(){
		if(check == true){
			Game.score++;
		}
	}
}


class Snake {
	constructor(){
		this.snakeLength = [];
		this.snakeLength[0] = {
			x: 6 * size,
			y: 6 * size
		};
		this.snakeX = this.snakeLength[0].x;
		this.snakeY = this.snakeLength[0].y;
	}
	eat(apple){
		if(this.snakeX == apple.x && this.snakeY == apple.y){
			
			apple.x = Math.round(Math.random()*11+1) * size;
			apple.y = Math.round(Math.random()*11+1) * size;
			
			return true;
		}
		else{
			return false;
		}
	}
	drawSnake(ctx,apple){
		for(let i = 0; i < this.snakeLength.length; i++){
			if(i == 0){
				ctx.fillStyle = "#943126";
			}
			else if(i % 2 == 0 && i != 0){
				ctx.fillStyle = "#EB984E";
			}else{
				ctx.fillStyle = "#EC7063";
			}
			
			ctx.fillRect(this.snakeLength[i].x,this.snakeLength[i].y,size,size);
			
		}
		if(!(this.eat(apple))){
			this.snakeLength.pop();
			check = false;
		}else{
			check = true;
		}
		
	}
	move(){
		if(dir == "left"){
			this.snakeX -= size;
		}
		if(dir == "right"){
			this.snakeX += size;
		}
		if(dir == "up"){
			this.snakeY -= size;
			
		}
		if(dir == "down"){
			this.snakeY += size;

		}
		
		let newSnakeCoord = {
			x: this.snakeX,
			y: this.snakeY
		};
		if(this.gameOver(newSnakeCoord,this.snakeLength)){
			alert("GAME OVER!");
		}
		this.snakeLength.unshift(newSnakeCoord);
		if(this.snakeX > maxWidth+size){
			this.snakeX = 0-size;
		}else if(this.snakeX < 0-size){
			this.snakeX = 16*size;
		}else if(this.snakeY > maxHeight+size){
			this.snakeY = 0-size;
		}else if(this.snakeY < 0-size){
			this.snakeY = 16*size;
		}
	}
	gameOver(begin,array){
		for(let i = 0; i < array.length; i++){
			if(begin.x == array[i].x && begin.y == array[i].y){
				return true;
			}
		}
		return false;
	}

}

let snake = new Snake();
let game = new Game(snake);

let g = setInterval(()=>game.drawGame(),100);

