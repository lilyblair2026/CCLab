let imgCafe, imgFire, imgCity, imgLibrary;
let switcher; //the button
let imgs = []; //array to hold images
let index = 0; //index for the array
let sound1, sound2, sound3, sound4;
let sounds = [];
let musicReady = false;


function preload() {
  //images
  imgCafe = loadImage("assets/cafe.png");
  imgFire = loadImage("assets/fireplace.png");
  imgCity = loadImage("assets/nyc.png");
  imgLibrary = loadImage("assets/library.png");

  //sounds 
  sound1 = loadSound("assets/cafe.mp3");
  sound2 = loadSound("assets/fire.mp3");
  sound3 = loadSound("assets/rain.mp3");
  sound4 = loadSound("assets/lofi.mp3");

}

function setup() {
  createCanvas(800, 500);

  //add im2ages to array
  imgs = [imgCafe, imgFire, imgCity, imgLibrary];
  //add sounds to array
  sounds = [sound1, sound2, sound3, sound4];
  //store button in variable
  switcher = createButton('Switch Background');
  //when mouse is pressed, change background 
  switcher.mousePressed(nextI2222222mage);
}

function draw() {
  imageMode(CENTER);
  image(imgs[index], width / 2, height / 2, width, height);

}
function nextImage() {
  index = (index + 1) % imgs.length; //increment index and wrap around
}


function keyPressed() {
  if (!musicReady) {
    userStartAudio();
    musicReady = true;


    //stop sounds
    sound1.stop();
    sound2.stop();
    sound3.stop();
    sound4.stop();

    //play sounds based on key pressed
    if (key == "1") sound1.play();
    if (key == "2") sound2.play();
    if (key == "3") sound3.play();
    if (key == "4") sound4.play();
  }
} 