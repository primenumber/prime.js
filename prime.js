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

function Layer() {
  return new PIXI.Container();
}

let stage = app.stage;

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

function hitTestRectangle(r1, r2) {
  r1.left = r1.x - r1.anchor.x * r1.width;
  r1.top = r1.y - r1.anchor.y * r1.height;
  r1.centerX = r1.left + r1.width / 2;
  r1.centerY = r1.top + r1.height / 2;

  r2.left = r2.x - r2.anchor.x * r2.width;
  r2.top = r2.y - r2.anchor.y * r2.height;
  r2.centerX = r2.left + r2.width / 2;
  r2.centerY = r2.top + r2.height / 2;

  const vx = r1.centerX - r2.centerX;
  const vy = r1.centerY - r2.centerY;

  const combinedHalfWidth = (r1.width + r2.width) / 2;
  const combinedHaldHeight = (r1.height + r2.height) / 2;

  return Math.abs(vx) < combinedHalfWidth &&
      Math.abs(vy) < combinedHaldHeight;
}
