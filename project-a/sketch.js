let g; // graphics/buffer

let state = "seed"; //controls seed progression
let growRate = 0; // tracks how much the flower has grown (0 = seed, 1 = grown)
let flowerCenterX;
let flowerCenterY;
let trainX = -200; // horizontal position of the subway

//butterfly arrays
let butterflyX = [];
let butterflyY = [];
let butterflyAngle = []; //direction of movement
let butterflySpeed = []; //speed of each butterfly
let butterflyZ = []; //offset for butterfly movement 
let deadFrame; //stores framecount when flower dies

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container"); // attach canvas to HTML element

    g = createGraphics(width, height);

    //set flower's position in the center/bottom of canvas
    flowerCenterX = width / 2;
    flowerCenterY = height / 2 + 70;

    //draws stars on the buffer/does not generate every frame
    for (let i = 0; i < 100; i = i + 0.5) {
        let starX = random(width);
        let starY = random(height * 0.3); // stars only in upperpart of canvas
        let size = random(2, 2);
        g.noStroke();
        g.fill(255);
        g.ellipse(starX, starY, size, size);
    }
}

function draw() {
    background(0); //qoute's background
    if (state != "flowerdies") {
        background(10, 12, 36); //night blue background
        image(g, 0, 0);
    } else {
        // fade away for quote
        background(200, 255, 255, 5);
    }

    if (state == "flowerdies") {
        //displays quote when flower dies
        fill(255); //
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(28);
        textFont("Satisfy");
        textStyle(ITALIC);
        text(
            "to chase the Noctiflor is to chase your own shadow",
            width / 2,
            height / 2
        );

        //second line of quote
        textSize(28);
        textFont("Satisfy");
        textStyle(ITALIC);
        text(
            "only to find it’s not yours when you turn around",
            width / 2,
            height / 1.8
        );

        return; // stop the draw
    }

    drawSubwayTrain(); //draw train

    // railway beneath the train
    push();
    let railX1 = 120;
    let railY2 = 130;
    stroke(100);
    strokeWeight(5);

    //rails
    line(0, railX1, width, railX1);
    line(0, railY2, width, railY2);

    // lines connecting rails
    stroke(100);
    strokeWeight(4);
    for (let x = 30; x <= width - 30; x += 30) {
        line(x, railX1 - 4, x, railY2 + 4);
    }
    pop();

    //draw moonlight that follows mouse
    let baseHeight = height;
    let baseWidth = 180;
    noStroke();
    fill(255, 255, 200, 60); // color of moonlight
    beginShape();
    vertex(0, 0); // top left corner
    vertex(mouseX + baseWidth / 1.5, baseHeight);
    vertex(mouseX - baseWidth / 1.5, baseHeight);
    endShape(CLOSE);

    // detect if moonlight is on the flower
    let moonOnPlant = false;
    if (abs(mouseX - flowerCenterX) < 80) {
        //if mouse is near center
        moonOnPlant = true;
    }

    // controlls growth, death, and butterflies
    if (state == "seed") {
        drawSeed(flowerCenterX, flowerCenterY + 60); //draw seed
        if (moonOnPlant == true) {
            state = "growing"; //start growth when moonlight covers seed
        }
    } else if (state == "growing") {
        if (growRate < 1) {
            growRate += 0.005; //how fast the flower grows
        } else {
            state = "flower"; //fully grown
        }
        drawPlant(flowerCenterX, flowerCenterY, growRate);
        if (moonOnPlant == false) {
            state = "dead"; //if moonlight leaves/plant dies
            makeButterflies(flowerCenterX, flowerCenterY); //then make butterflies
        }
    } else if (state == "flower") {
        drawPlant(flowerCenterX, flowerCenterY, 1);
        if (moonOnPlant == false) {
            state = "dead"; //plant dies if moonlight leaves
            makeButterflies(flowerCenterX, flowerCenterY); //make butterflies
        }
    } else if (state == "dead") {
        drawPlant(flowerCenterX, flowerCenterY, 1, true); //draw grayed out flowers
        for (let i = 0; i < butterflyX.length; i = i + 1) {
            moveAndDrawButterfly(i); //animate the butterflies
        }
        if (deadFrame == undefined) {
            deadFrame = frameCount; //store time of death
        }
        //  after butterflies, display qoute
        if (frameCount - deadFrame > 380) {
            state = "flowerdies";
        }
    }
}

// subway background
function drawSubwayBackground() {
    noStroke();
    fill(255);
    rect(0, 0, width, 150);
}

// subway train
function drawSubwayTrain() {
    trainX = trainX + 2.2; //move train to the right
    if (trainX > width + 200) {
        trainX = -200;
    }

    let trainBoxes = 4; //number of train boxes
    let boxWidth = 120;
    let gap = 10;

    for (let i = 0; i < trainBoxes; i = i + 1) {
        let boxX = trainX + i * (boxWidth + gap);

        // body
        fill(140, 0, 0);
        rect(boxX, 60, boxWidth, 50);

        // windows
        fill(220, 180, 40);
        rect(boxX + 20, 68, 20, 15);
        rect(boxX + 50, 68, 20, 15);
        rect(boxX + 80, 68, 20, 15);

        // wheels
        fill(70);
        ellipse(boxX + 20, 110, 28, 28);
        ellipse(boxX + boxWidth - 20, 110, 28, 28);
    }
}

//the seed (golden snitch)
function drawSeed(x, y) {
    // "glowing" effect
    noStroke();
    fill(255, 220, 100, 60);
    ellipse(x, y, 38, 38);
    fill(255, 240, 160, 40);
    ellipse(x, y, 60, 60);

    // wings for snitch
    fill(220, 220, 220, 160); //white-grey mix
    ellipse(x - 16, y - 5, 20, 8);
    ellipse(x + 16, y - 5, 20, 8);

    // snitch body (gold)
    fill(230, 180, 40);
    ellipse(x, y, 20, 20);
}

//draw plant (stem, leaves, flower petals) at any growth stage
function drawPlant(x, y, growAmount, grayOut) {
    // stem
    if (grayOut == true) {
        stroke(120, 120, 120); //gray if dead
    } else {
        stroke(70, 170, 100); // green if alive
    }
    strokeWeight(10);
    let stemLength = 150 * growAmount;
    line(x, y, x, y + stemLength);
    noStroke();

    // draw leaves after 40% stem growth
    if (growAmount > 0.4) {
        let leafX = 55 * growAmount;
        let leafY = 25 * growAmount;
        if (grayOut == true) {
            fill(120, 120, 120);
        } else {
            fill(60, 170, 110);
        }
        ellipse(x - 30, y + 80, leafX, leafY); // left leaf

        if (grayOut == true) {
            fill(120, 120, 120);
        } else {
            fill(80, 190, 110);
        }
        ellipse(x + 36, y + 100, leafX + 5, leafY + 3); // right leaf
    }

    // draw flower after 70% growth 
    if (growAmount > 0.7) {
        let miniFlowers = 15; // number of petals
        let clusterRadius = 35 * (growAmount - 0.7) * 3; //cluster expands as growth nears 1
        for (let i = 0; i < miniFlowers; i = i + 1) {
            let angle = map(i, 0, miniFlowers, 0, TWO_PI); //distributes petals in a circle
            let px = x + cos(angle) * clusterRadius;
            let py = y + sin(angle) * clusterRadius;
            drawMiniHydrangea(px, py, 22 + 10 * (growAmount - 0.7), grayOut); //draw each petal
        }
        ellipse(x, y, 45, 45); //flower center
    }
}

//draw a single petal (petal clusters)
function drawMiniHydrangea(x, y, size, grayOut) {
    if (grayOut == true) {
        fill(150, 150, 150);
    } else {
        let r = random(180, 255);
        let g = random(160, 220);
        let b = random(240, 255);
        fill(r, g, b);
    }
    ellipse(x, y - 9, 20, 15);
    ellipse(x + 9, y, 20, 15);
    ellipse(x, y + 9, 20, 15);
    ellipse(x - 9, y, 20, 15);
    if (grayOut == true) {
        fill(210, 210, 210); //gray out center  if dead
    } else {
        fill(250, 245, 235); //light center if alive
    }
}

// butterflies when the flowers die
function makeButterflies(x, y) {
    butterflyX = [];
    butterflyY = [];
    butterflyAngle = [];
    butterflySpeed = [];
    butterflyZ = [];
    let total = 18; //number of butterflies
    for (let i = 0; i < total; i = i + 1) {
        let angle = map(i, 0, total, 0, TWO_PI); // distributed around the flower
        let speed = random(2, 5); //randomized speed
        butterflyX.push(x);
        butterflyY.push(y);
        butterflyAngle.push(angle);
        butterflySpeed.push(speed + random(-0.5, 0.5));
        butterflyZ.push(random(1000));
    }
}

function moveAndDrawButterfly(i) {
    butterflyX[i] = butterflyX[i] + cos(butterflyAngle[i]) * butterflySpeed[i];
    butterflyY[i] =
        butterflyY[i] +
        sin(butterflyAngle[i]) * butterflySpeed[i] -
        sin(frameCount * 0.2 + butterflyZ[i]) * 2;
    g.noStroke();

    //color of butterfly wings
    g.fill(200, 160, 255, 30);
    g.ellipse(butterflyX[i] - 6, butterflyY[i], 13, 18);
    g.ellipse(butterflyX[i] + 6, butterflyY[i], 13, 18);

    //color of butterfly body
    g.fill(200, 160, 255, 20);
    g.ellipse(butterflyX[i], butterflyY[i], 5, 14);
}