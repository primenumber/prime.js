// load
loadImages(["cat.png"]);

// init
let cat;
let hello;
function init() {
  cat = ImageObject("cat.png");
  addObject(cat);
  hello = TextObject("Hello, World!", {fill: 'white'});
  addObject(hello);
}

const velocity = 3;

// main loop
function mainloop(delta) {
  if (keyStates[KeyRight]) {
    cat.x += velocity;
  } if (keyStates[KeyLeft]) {
    cat.x -= velocity;
  } if (keyStates[KeyUp]) {
    cat.y -= velocity;
  } if (keyStates[KeyDown]) {
    cat.y += velocity;
  }
}
