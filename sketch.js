var capture;
var mic, fft;
var campitura = "white";

function setup() {
  createCanvas(640, 550);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);

  var capturePixels = capture.loadPixels();
  image(capturePixels, 0, 0, 640, 480);
  var amount = 100;

  for (var i = 0; i < amount; i++) {
    var x = random(640);
    var y = random(480);
    var c = capturePixels.get(x, y);
    noStroke();
    fill(c);
    rect(x, y, 30, 30);
  }

  var spectrum = fft.analyze();
  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();

  if (keyIsPressed) {
    //keyIsPressed is a new variable

    fill(campitura);
    background(campitura);
  }

  textFont("Satisfy");
  textAlign(CENTER);
  textSize(15);
  fill(campitura, campitura, campitura, 100);
  text("Move your mouse and press any keys", 500, 510);
}

function keyReleased() {
  campitura = color(random(255), random(255), random(255), 100);
}
