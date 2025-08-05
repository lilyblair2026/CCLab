let particles = [];
let bounceCircles = [];
let dancer;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // particles
  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(-150, -50);
    particles[i] = new Particle(x, y);
  }

  // Add bouncing circles
  for (let i = 0; i < 100; i++) {
    bounceCircles.push(new BouncingCircle(random(width), random(height)));
  }

  // LilyDancer
  dancer = new LilyDancer(width / 2, height / 2);
}

function draw() {
  background(50);

  // rectangles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.zigzag();
    p.reappear();
    p.display();
  }

  // bouncing circles
  for (let i = 0; i < bounceCircles.length; i++) {
    bounceCircles[i].move();
    bounceCircles[i].display();
  }

  // dancer
  dancer.update();
  dancer.display();
}

// glitchy rectangle
class Particle {
  constructor(initX, initY) {
    this.x = initX;
    this.y = initY;
    this.len = random(30, 80);
    this.xSpeed = 0;
    this.ySpeed = random(5, 15);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  zigzag() {
    this.x += random(-1, 1);
  }
  reappear() {
    if (this.y > height) {
      this.y = 0;
    }
  }
  display() {
    push();
    noStroke();
    stroke(255, 60);
    rect(this.x, this.y, this.x, this.y - this.len);

    fill(255);
    circle(this.x1, this.y1, this.dia);
    pop();
  }
}

// Bouncing circle
class BouncingCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(20, 50);
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
    //colors
    this.r = random(255);
    this.g = random(100, 255);
    this.b = random(200, 255);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    //bounce off walls
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b, 170);
    ellipse(this.x, this.y, this.dia);
    pop();
  }
}

// LilyDancer
class LilyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 100;
  }
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
    ellipse(-20 + eyesMove, -55, 9, 10);
    ellipse(20 + eyesMove, -55, 9, 10);
    // beak
    fill(255, 180, 50);
    triangle(0, -45, -8, -37, 8, -37);
    pop();
  }
}
