let width = 800;
let height = 600;

function isGoogleChrome() {
  var userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("edge") != -1) return false;
  return userAgent.indexOf("chrome") != -1;
}

function isLocal() {
  return location.protocol == "file:";
}

function needToDisableWebGL() {
  return isGoogleChrome() && isLocal();
}

let app = new PIXI.Application({width: width, height: height, forceCanvas: needToDisableWebGL()});

window.onload = () => {
  document.body.appendChild(app.view);
  app.ticker.add(delta => mainloop(delta));
}

function loadImages(image_url) {
  PIXI.loader
    .add(image_url)
    .load(init);
}

function ImageObject(image_url) {
  return new PIXI.Sprite(PIXI.utils.TextureCache[image_url]);
}

function TextObject(text, style) {
  return new PIXI.Text(text, style);
}

function addObject(object) {
  app.stage.addChild(object);
}

function removeObject(object) {
  app.stage.removeChild(object);
}

let keyStates = new Array(256);
const KeyShift = 16;
const KeyCtrl = 17;
const KeyAlt = 18;
const KeySpace = 32;
const KeyLeft = 37;
const KeyUp = 38;
const KeyRight = 39;
const KeyDown = 40;

for (i = 0; i < 256; ++i) {
  keyStates[i] = false;
}

document.onkeydown = function(e) {
  keyStates[e.keyCode] = true;
}

document.onkeyup = function(e) {
  keyStates[e.keyCode] = false;
}
