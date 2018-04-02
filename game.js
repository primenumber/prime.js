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
  if (isKeyDown("ArrowRight")) {
    cat.x += velocity;
  } if (isKeyDown("ArrowLeft")) {
    cat.x -= velocity;
  } if (isKeyDown("ArrowUp")) {
    cat.y -= velocity;
  } if (isKeyDown("ArrowDown")) {
    cat.y += velocity;
  }
}
