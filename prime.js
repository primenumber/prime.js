let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    Text = PIXI.Text;
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

let app = new Application({width: width, height: height, forceCanvas: needToDisableWebGL()});

let loadImagesPromise;
let loadSoundsPromise;

function endLoad() {
  init();
  app.ticker.add(delta => mainloop(delta));
}

window.onload = () => {
  app.renderer.resize(width, height);
  app.renderer.backgroundColor = backgroundColor;
  document.body.appendChild(app.view);
  Promise.all([loadImagesPromise, loadSoundsPromise]).then(endLoad);
}

function loadImages(image_urls) {
  loadImagesPromise = new Promise((resolve) => {
    loader
      .add(image_urls)
      .load(resolve);
  });
}

function loadSounds(sound_urls) {
  sounds.load(sound_urls);
  loadSoundsPromise = new Promise((resolve) => {
    sounds.whenLoaded = () => { resolve(); };
  });
}

function ImageObject(image_url) {
  return new Sprite(PIXI.utils.TextureCache[image_url]);
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

let mouseX = 0.0;
let mouseY = 0.0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, false);

let mouseStates = new Map();

function isMouseDown(buttonNumber) {
  if (mouseStates.has(buttonNumber)) {
    return mouseStates.get(buttonNumber);
  } else {
    return false;
  }
}

document.addEventListener('mousedown', (e) => {
  mouseStates.set(e.button, true);
}, false);

document.addEventListener('mouseup', (e) => {
  mouseStates.set(e.button, false);
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
