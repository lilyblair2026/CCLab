let sound;


function preload() {
  sound = loadSound("assets/ikon.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);


  let volValue = map(mouseY, 0, height, 1.0, 0.0, true);
  //sound.setValue(volValue);

  let panValue = map(mouseX, 0, width, -1.0, 1.0, true);
  // sound.pan(panValue);

  let rateValue = map(mouseX, 0, width, 0.5, 0.01, true);
  // sound.rate(rateValue);




}
function mousePressed() {
  sound.play();
}

