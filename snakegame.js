//Dominic Borg
//Create Task

//declare global variables
let score = 0;
let cellWidth = 20;
let nCols, nRows;
let snake, food;
let gameState = 0;

function setup() {
  createCanvas(800, 700);
  frameRate(10);

  nCols = width / cellWidth;
  nRows = height / cellWidth;
  snake = new Snake();
  food = new Food();
}

function draw() {
  background(0);
  if (gameState === 0) { //Shows the starting screen
    startGame();
  }
  if (gameState === 1) { //Runs the game
    runGame();
  }
  if (gameState === 3) { //Shows the help screen
    helpGame();
  }
  if (gameState === 2) { //Shows the ending screen
    endGame();
  }
}

function keyPressed() { //Changes direction when key is pressed
  if (keyCode === UP_ARROW) {
    if (snake.vel.y !== cellWidth) {
      snake.vel = createVector(0, -cellWidth);
    }
  }
  if (keyCode === DOWN_ARROW) {
    if (snake.vel.y !== -cellWidth) {
      snake.vel = createVector(0, cellWidth);
    }
  }
  if (keyCode === LEFT_ARROW) {
    if (snake.vel.x !== cellWidth) {
      snake.vel = createVector(-cellWidth, 0);
    }
  }
  if (keyCode === RIGHT_ARROW) {
    if (snake.vel.x !== -cellWidth) {
      snake.vel = createVector(cellWidth, 0);
    }
  }
}

function startGame() { //Shows the title screen for the game
  //****************** properties
  score = 0;
  let b1 = new Button(180, 480, 150, 50, 'PLAY');//creates play button
  let b2 = new Button(455, 480, 150, 50, 'HELP');//creates help button

  //****************** functions
  b1.run();
  b2.run();
  //creates the starting text
  textFont('Georgia');
  textSize(85);
  fill(0, 245, 0);
  text('Snake Game', 160, height / 2);
}

function Button(x, y, l, w, str) {
    //******************* Properties
    this.loc = createVector(x, y);
    this.msg = str; //this is the message the button will display
    this.width = w;
    this.length = l;
    this.clr = color(245, 7, 18);
  
    //******************** Functions
    this.render = function() { //draws the buttons
      if (this.mouseIsOver()) {
        fill(250, 7, 207);
        rect(this.loc.x, this.loc.y, this.length, this.width);
        fill(255);
        textSize(48);
        text(this.msg, this.loc.x + 12, this.loc.y + 42);
        if (mouseIsPressed && gameState === 0) {
          if (this.msg === 'PLAY') {//changes from title screen depending on message
            gameState = 1;
          }
          if(this.msg === 'HELP'){
            gameState = 3;
          }
        }
        if(mouseIsPressed && gameState === 3){
          if(this.msg === 'BACK'){//changes game state depending on message
            gameState = 0;
          }
        }
        if(mouseIsPressed && gameState === 2){
          if(this.msg === 'BACK'){
            gameState = 0;
          }
        }
      } else {
        fill(250, 7, 18);
        rect(this.loc.x, this.loc.y, this.length, this.width);
        fill(255);
        textSize(48);
        text(this.msg, this.loc.x + 12, this.loc.y + 42);
      }
    }
    this.run = function() {
      this.render();
      this.mouseIsOver();
    }
  
    this.mouseIsOver = function() {//checks if mouse is over the button
      if (mouseX > this.loc.x && mouseX < (this.loc.x + 150) && mouseY > this.loc.y && mouseY < (this.loc.y + 50)) {
        return true;
      } else {
        return false;
      }
    }
  }

  function Food() {
    //********************* properties
    this.loc = createVector(floor(random(nCols)) * cellWidth, floor(random(nRows)) * cellWidth);
    //********************* functions
    this.render = function() {
      noStroke();
      fill(250, 18, 7);
      rect(this.loc.x, this.loc.y, cellWidth, cellWidth);
    }
  }

  function Snake() {
    //************* properties
    let x = floor(random(nCols)) * cellWidth;
    let y = floor(random(nRows)) * cellWidth;
    this.segments = [];
    this.head = createVector(x, y);
    this.vel = createVector(0, 0);
  
    //************* functions
    this.run = function() {
      this.update();
      this.render();
    }
  
    this.render = function() {
      for (let i = 0; i < this.segments.length; i++) { //renders the body of the snake
        stroke(0);
        fill(0, 245, 0);
        rect(this.segments[i].x, this.segments[i].y, cellWidth, cellWidth);
      }
      fill(0, 245, 0);
      rect(this.head.x, this.head.y, cellWidth, cellWidth);
    }
  
    this.update = function() {
      if(this.head.x < 0 || this.head.x > width ||this.head.y < 0 || this.head.y > height){
        gameState = 2;//checks if snake is hitting the side, ends game if true
      }
          for (let i = this.segments.length - 1; i > 0; i--){
      if(this.head.x === this.segments[i].x && this.head.y === this.segments[i].y){
        gameState = 2;//checks if head is touching body, ends game if true
      }
         }
      
      if (food.loc.x === this.head.x && food.loc.y === this.head.y) { //checks for collision with food, warps food to another location
        score++;
        food.loc.x = floor(random(nCols)) * cellWidth;
        food.loc.y = floor(random(nRows)) * cellWidth;
        this.segments.push(createVector(0, 0));
      }
  
      for (let i = this.segments.length - 1; i > 0; i--) { //causes each segment to occupy the position of the one before it
        this.segments[i].x = this.segments[i - 1].x;
        this.segments[i].y = this.segments[i - 1].y;
          }
      this.head.add(this.vel);
      this.segments[0] = createVector(this.head.x, this.head.y);//Sets the first body segment at the location of the head
  
  }
  }

  function runGame() {
    snake.run();//draws and moves snake
    food.render();//draws food
    textFont('Georgia'); //prints score in upper left corner
    textSize(60);
    text(score, 65, 90);
  }

  function endGame() {
    //******************** properties
    b4 = new Button(325, 470, 150, 50, 'BACK');
    //******************** functions
    b4.run();
    fill(245, 17, 8);
    textSize(50);
    text('Better luck next time!', 160, 350);
    text('Your score was ' + score + '.',210,420);//prints score
    snake.segments.length = 0;
    snake.head.x = floor(random(nCols)) * cellWidth;//randomizes the snake location and food location
    snake.head.y = floor(random(nRows)) * cellWidth;
    snake.vel = createVector(0, 0);
    food.loc = createVector(floor(random(nCols)) * cellWidth, floor(random(nRows)) * cellWidth);
  }

  function helpGame() {
    //********************** properties
    let b3 = new Button(325, 450, 150, 50, 'BACK');
    //********************** functions
    b3.run();
    fill(245, 7, 18);
    textSize(60);
    text('Press arrow keys to move.', 65, 320);
    text('Try not to screw up.', 140, 390);
  }