let width = 800;
let height = 600;
let backgroundColor = 0x000000;

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
  app.renderer.backgroundColor = backgroundColor;
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

let keyStates = new Map();

function isKeyDown(key) {
  if (keyStates.has(key)) {
    return keyStates.get(key);
  } else {
    return false;
  }
}

document.addEventListener('keydown', (e) => {
  keyStates.set(e.key, true);
}, false);

document.addEventListener('keyup', (e) => {
  keyStates.set(e.key, false);
}, false);
