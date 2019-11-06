class Snake {
  constructor() {
    this.speed = 1;
    this.speedX = this.speed;
    this.speedY = 0;
    this.x = 0;
    this.y = 0;
    this.size = 20;
    this.snake = [];
    this.food = {};
    this.foodLocation();
    this.lastKey = "right";
  }
  foodLocation() {
    let cols = floor(random(width / this.size)) * this.size;
    let rows = floor(random(height / this.size)) * this.size;
    this.food = { x: cols, y: rows };
  }
  direction() {
    // functions
    const changeDir = function(x, y) {
      this.speedX = x;
      this.speedY = y;
    }.bind(this);

    // Code
    let left = keyCode === 65 || keyCode === 37;
    let up = keyCode === 87 || keyCode === 38;
    let right = keyCode === 68 || keyCode === 39;
    let down = keyCode === 83 || keyCode === 40;
    // left
    if (left && this.lastKey !== "right") {
      changeDir(-this.speed, 0);
      this.lastKey = "left";
    }
    // up
    else if (up && this.lastKey !== "down") {
      changeDir(0, -this.speed);
      this.lastKey = "up";
    }
    // right
    else if (right && this.lastKey !== "left") {
      changeDir(this.speed, 0);
      this.lastKey = "right";
    }
    // down
    else if (down && this.lastKey !== "up") {
      changeDir(0, this.speed);
      this.lastKey = "down";
    }
  }
  draw() {
    // functions
    const update = function() {
      this.x += this.speedX * this.size;
      this.y += this.speedY * this.size;
      // this.x = constrain(this.x, 0, width - this.size);
      this.x = Math.max(Math.min(this.x, width - this.size), 0);
      this.y = constrain(this.y, 0, height - this.size);
      for (let x = 0; x < this.snake.length - 1; x++) {
        this.snake[this.snake.length - (x + 1)] = this.snake[
          this.snake.length - (x + 2)
        ];
      }
      this.snake[0] = { x: this.x, y: this.y };
    }.bind(this);

    const isEaten = function() {
      let f = this.food;
      if (f.x === this.x && f.y === this.y) return true;
      else return false;
    }.bind(this);

    const gameOver = function() {
      for (let x = 1; x < this.snake.length; x++) {
        if (this.snake[x].x === this.x && this.snake[x].y === this.y) {
          return noLoop();
        }
      }
    }.bind(this);

    // code
    update();

    this.direction();
    // draw snake
    fill(255);
    for (let snake of this.snake) {
      rect(snake.x, snake.y, this.size, this.size);
    }
    // draw food
    fill(50, 150, 200);
    rect(this.food.x, this.food.y, this.size, this.size);
    gameOver();
    if (isEaten()) {
      this.snake.push({});
      this.foodLocation();
    }
  }
}
