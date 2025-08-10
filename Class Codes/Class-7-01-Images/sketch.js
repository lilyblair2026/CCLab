let img;


function preload() {
  img = loadImage("assets/sprite.png");
}
function setup() {
  let canvas = createCanvas(500, 300);
  canvas.parent("p5-canvas-container");
}

function draw() {


  let x = mouseX;
  let y = mouseY;
  let size = 30;


  push();
  blendMode(MUTIPLY);

  tint(200, 200, 100, 10);
  imageMode(CENTER);
  image(img, x, y, size, size)

  pop();

}