let particles = []; // empty array!


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(-150, -50);
    particles[i] = new Particle(x, y);
  }


}
function draw() {
  background(50);




  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.zigzag();
    p.reappear();
    p.display();
  }
}


//
class Particle {
  constructor(initX, initY) {
    this.x = initX;
    this.y = initY;
    this.len = random(30, 80);
    this.xSpeed = 0;
    this.ySpeed = random(5, 15);
    this.thickness = random(1, 3);
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
    strokeWeight(this.thickness)
    line(this.x, this.y, this.x, this.y - this.len);
    pop();
  }
}
