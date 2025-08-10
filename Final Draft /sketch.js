//life360
let life360Pic; //image
let life360 = [];
let life360Open = false;

//spotify
let spotifyAlbums; //album images
let spotifyOpen = false;
let currentAlbum = null;
let currentSong = null;
let spotifyPlaylist = [];

//vsco
let vscoPics;
let vscoOpen = false;
let currentVscoImage = null;

// notification sound
let ding;
let apps = {};

// notifications
let notifX = [];
let notifY = [];
let notifMsg = [];
let nextY = 120;
let notifBirth = [];
let notifIcon = [];
let notifApp = [];
let lifespan = 5000;
let lastSpawn = 0;

// memes
let mode = "memeCentral";
let memes = [];
let currentMeme = null;

// iMessage
let chatOpen = false;
let chatTime = "6:30PM";
let currentChat = [];
let nextMSG = 0;
let lastTypeTime = 0;   //timer for reveal 

// separate chats (no array inside array)
let chatBestie = [
  { Sender: "Bestie", message: "hey, wyd tn" },
  { Sender: "You", message: "going to the area 51 raid wby" },
  { Sender: "Bestie", message: "learning renegade lol" },
  { Sender: "You", message: "send link" },
  { Sender: "Bestie", message: "check dms" },
  { Sender: "Bestie", message: "..." }
];

let chatMom = [
  { Sender: "You", message: "Can I buy the white birkenstocks" },
  { Sender: "Mom", message: "Didn't I just buy you teleties" },
  { Sender: "You", message: "PLEASE, everyone has them" },
  { Sender: "Mom", message: "Well, if everyone jumps off a cliff." },
  { Sender: "Mom", message: "Are you gonna jump?" },
  { Sender: "You", message: "probably" },
  { Sender: "Mom", message: "you can find a part-time job" },
  { Sender: "You", message: "I should have asked dad" }
];


// notification data
let messages = [
  { app: "Instagram", text: "Charlie D'Amelio posted", icon: "insta" },
  { app: "Instagram", text: "@area51raiders just went live", icon: "insta" },
  { app: "Instagram", text: "Emma Chamberlain tagged you", icon: "insta" },
  { app: "Instagram", text: "New DM from Birds Aren't Real", icon: "insta" },
  { app: "Spotify", text: "New 2019 Playlist", icon: "spotify" },
  { app: "Tiktok", text: "Renegade Tutorial", icon: "tiktok" },
  { app: "iMessage", text: "and I oop....sksksk", icon: "iMessage" },
  { app: "iMessage", text: "i got new birkenstocks!!", icon: "iMessage" },
  { app: "iMessage", text: "oof, that's sus", icon: "iMessage" },
  { app: "Facetime", text: "Missed Group Call from Area 51 Raid", icon: "facetime" },
  { app: "Snapchat", text: "100 day streak lost", icon: "snap" },
  { app: "VSCO", text: "New post in your feed", icon: "vsco" },
  { app: "Phone", text: "Missed call from Dad", icon: "phone" },
  { app: "Life360", text: "you are over speed limit", icon: "life360" }
];

function preload() {

  // vsco notification
  vscoPics = [
    { pic: loadImage("assets/vsco1.png") },
    { pic: loadImage("assets/vsco1.png") },
    { pic: loadImage("assets/vsco1.png") }
  ];


  //life360  notification
  life360Pic = loadImage("assets/speedlimit.png");

  //spotify songs + album covers
  spotifyPlaylist = [
    { song: loadSound("assets/sayso.mp3"), album: loadImage("assets/sayso.png") },
    { song: loadSound("assets/tonguetied.mp3"), album: loadImage("assets/tonguetied.png") },
    { song: loadSound("assets/nights.mp3"), album: loadImage("assets/nights.png") },
    { song: loadSound("assets/dance.mp3"), album: loadImage("assets/dance.png") },
    { song: loadSound("assets/riptide.mp3"), album: loadImage("assets/riptide.png") },
    { song: loadSound("assets/ribs.mp3"), album: loadImage("assets/ribs.png") },
    { song: loadSound("assets/roxanne.mp3"), album: loadImage("assets/roxanne.png") },
    { song: loadSound("assets/electric.mp3"), album: loadImage("assets/electric.png") },
    { song: loadSound("assets/stars.mp3"), album: loadImage("assets/stars.png") },
    { song: loadSound("assets/backyardboy.mp3"), album: loadImage("assets/backyardboy.png") },
    { song: loadSound("assets/payphone.mp3"), album: loadImage("assets/payphone.png")}
  ];


  // sound
  ding = loadSound("assets/ding.mp3");

  // icons
  apps.tiktok = loadImage("assets/tiktok.png");
  apps.snap = loadImage("assets/snap.png");
  apps.insta = loadImage("assets/insta.png");
  apps.vsco = loadImage("assets/vsco.png");
  apps.phone = loadImage("assets/phone.png");
  apps.iMessage = loadImage("assets/message.png");
  apps.life360 = loadImage("assets/life360.png");
  apps.spotify = loadImage("assets/music.png");
  apps.facetime = loadImage("assets/facetime.png");

  // memes
  memes[0] = loadImage("assets/meme.png");
  memes[1] = loadImage("assets/meme1.png");
  memes[2] = loadImage("assets/meme2.png");
  memes[3] = loadImage("assets/meme3.png");
  memes[4] = loadImage("assets/meme4.png");
  memes[5] = loadImage("assets/meme5.png");
  memes[6] = loadImage("assets/meme6.png");
  memes[7] = loadImage("assets/meme7.png");
  memes[8] = loadImage("assets/meme8.png");
  memes[9] = loadImage("assets/meme9.png");
  memes[10] = loadImage("assets/meme10.png");
  memes[11] = loadImage("assets/meme11.png");
  memes[12] = loadImage("assets/meme12.png");
  memes[13] = loadImage("assets/meme13.png");
  memes[14] = loadImage("assets/meme14.png");
  memes[15] = loadImage("assets/meme15.png");
  memes[16] = loadImage("assets/meme16.png");
  memes[17] = loadImage("assets/meme17.png");
  memes[18] = loadImage("assets/meme18.png");
  memes[19] = loadImage("assets/meme19.png");
  memes[20] = loadImage("assets/meme20.png");

}

function setup() {
  let canvas = createCanvas(400, 800);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
  noStroke();

  // meme overlay
  if (mode == "memes" && currentMeme) {
    fill(0, 180);
    rect(0, 0, width, height);
    imageMode(CENTER);
    image(currentMeme, width / 2, height / 2, 300, 300);
    return;
  }

  //life360 overlay
  if (life360Open) {
    fill(0, 180);
    rect(0, 0, width, height);
    imageMode(CENTER);
    image(life360Pic, width / 2, height / 2, 360, 720);
    return;
  }

  //spotify overlay
  if (spotifyOpen) {
    fill(0, 180);
    rect(0, 0, width, height);
    imageMode(CENTER);
    image(currentAlbum, width / 2, height / 2, 300, 300);
    return;
  }

  //vsco overlay 
  if (vscoOpen) {
    fill(0, 180);
    rect(0, 0, width, height);
    imageMode(CENTER);
    image(currentVscoImage, width / 2, height / 2, 300, 300);
    return;
  }
  // phone
  fill(0);
  rect(0, 0, width, height, 40);
  fill(255);
  rect(20, 20, 360, 760, 30);
  fill(80);
  rect(width / 2 - 30, 30, 60, 10, 5);

  // notifications
  for (let i = notifMsg.length - 1; i >= 0; i--) {
    let age = millis() - notifBirth[i];
    if (age > lifespan) {
      notifX.splice(i, 1);
      notifY.splice(i, 1);
      notifMsg.splice(i, 1);
      notifBirth.splice(i, 1);
      notifIcon.splice(i, 1);
      notifApp.splice(i, 1);
    } else {
      fill(255);
      rect(notifX[i], notifY[i], 250, 56, 14);
      imageMode(CORNER);
      image(notifIcon[i], notifX[i] + 10, notifY[i] + 12, 30, 30);
      fill(0);
      textAlign(LEFT, CENTER);
      textStyle(BOLD);
      textSize(12);
      text(notifApp[i], notifX[i] + 52, notifY[i] + 26);
      textStyle(NORMAL);
      textSize(12);
      fill(30);
      text(notifMsg[i], notifX[i] + 52, notifY[i] + 44);
    }
  }
  // iMessage overlay
  if (chatOpen) {
    fill(0, 150);
    rect(20, 20, 360, 760, 30);

    // header
    fill(255);
    rect(40, 60, 320, 40, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text("iMessage" + chatTime, 200, 80);

    // reveal one message per second
    if (millis() - lastTypeTime > 1000 && nextMSG < currentChat.length) {
      nextMSG = nextMSG + 1;
      lastTypeTime = millis();
    }

    // messages
    let y = 120;
    textAlign(LEFT, TOP);
    textSize(12);
    for (let m = 0; m < nextMSG; m++) {
      fill(230);
      rect(60, y, 260, 36, 10);
      fill(0);
      text(currentChat[m].Sender + ": " + currentChat[m].message, 68, y + 10);
      y = y + 46;
    }
  }

  // spawn notifications every 5 sec
  if (millis() - lastSpawn > 5000) {
    let choice = random(messages);
    let icon = apps[choice.icon];
    let body = choice.text;
    let appName = choice.app;

    notifX.push(50);
    notifY.push(nextY);
    notifApp.push(appName);
    notifMsg.push(body);
    notifIcon.push(icon);
    notifBirth.push(millis());

    nextY = nextY + 60;
    if (ding && ding.isLoaded()) {
      ding.play();
    }
    lastSpawn = millis();
    if (nextY > 700) {
      nextY = 120;
    }
  }
}

function mousePressed() {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }

  // close chat
  if (chatOpen) {
    chatOpen = false;
    return;
  }

  // close meme
  if (mode == "memes") {
    mode = "memeCentral";
    return;
  }


  //close life360
  if (life360Open) {
    life360Open = false;
    return;
  }

  //close spotify
  if (spotifyOpen) {
    spotifyOpen = false;
    if (currentSong && currentSong.isPlaying()) {
      currentSong.stop();
    }
    return;
  }

  //close vsco
  if (vscoOpen) {
    vscoOpen = false;
    return;
  }

  //instagram
  for (let i = 0; i < notifMsg.length; i++) {
    if (
      mouseX > notifX[i] &&
      mouseX < notifX[i] + 250 &&
      mouseY > notifY[i] &&
      mouseY < notifY[i] + 56
    ) {
      if (notifApp[i] == "Instagram") {
        currentMeme = random(memes);
        mode = "memes";
        return;
      }

      //imessage
      if (notifApp[i] == "iMessage") {
        chatOpen = true;
        // pick one of the two chats 
        let pickChat = random(2);
        if (pickChat < 1) {
          currentChat = chatBestie;
        } else {
          currentChat = chatMom;
        }

        nextMSG = 0;
        lastTypeTime = millis();
        return;
      }
      //life360
      if (notifApp[i] == "Life360") {
        life360Open = true;
        return;
      }
      //spotify
      if (notifApp[i] == "Spotify") {
        let playlist = random(spotifyPlaylist);
        currentSong = playlist.song;
        currentAlbum = playlist.album;
        spotifyOpen = true;
        if (currentSong && currentSong.isLoaded())
          currentSong.play();
        return;
      }
      //vsco
      if (notifApp[i] == "VSCO") {
        currentVscoImage = random(vscoPics).pic;
        vscoOpen = true;
        return;
      }
    }
  }
}
