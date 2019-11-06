let game;
function setup() {
  createCanvas(600, 600);
  game = new Snake();
  frameRate(10);
}
function draw() {
  background(150);
  game.draw();
}

function mousePressed() {
  noLoop();
}
