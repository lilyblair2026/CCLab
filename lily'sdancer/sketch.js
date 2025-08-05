let dancer;

function setup() {
  let canvas = createCanvas(200, 200);
  canvas.parent("p5-canvas-container");
  dancer = new LilyDancer(width / 2, height / 2);
}

function draw() {
  background(100);
  dancer.update();
  dancer.display();
}

class LilyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 100; // body diameter

  }
  // functions --> methods
  update() {
    this.move();
    this.shake();
  }
  move() {
    this.x = width / 2 + sin(frameCount * 0.01) * 40;
  }
  shake() {
    this.y = height / 2 + sin(frameCount * 0.2) * 10;
  }
  display() {
    push();
    translate(this.x, this.y);



    let wing = sin(frameCount) * 5;
    // wings 
    fill(random(100, 170), random(170, 220), random(220, 255));
    noStroke();
    ellipse(-55, wing, 35, 50); // left wing
    ellipse(55, -wing, 35, 50);  // right wing


    // penguin body 
    fill(173, 216, 230);
    circle(0, 0, this.dia);
    fill(255);
    circle(0, 0, this.dia * 0.5);
    fill(173, 216, 230);
    circle(0, -50, this.dia * 0.8);


    let eyesMove = map(mouseX, 0, width, -1, 1);
    // eyes
    fill(0);
    ellipse(-20 + eyesMove, -55, 9, 10);  // left 
    ellipse(20 + eyesMove, -55, 9, 10);   // right 

    // beak
    fill(255, 180, 50);
    triangle(0, -45, -8, -37, 8, -37);

    pop();
  }
}
