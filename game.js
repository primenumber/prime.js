// settings
backgroundColor = 0xFFFFFF;

// load
loadImages([
  "cat.png",
  "cat_hand.png"
]);

// init
let cat;
let hello;
let hands = [];
function init() {
  cat = ImageObject("cat.png");
  cat.anchor.set(0.5, 0.5);
  cat.x = 400;
  cat.y = 400;
  addObject(cat);
  hello = TextObject("Hello, World!", {fill: 'white'});
  addObject(hello);
}

const cat_v = 3;

// main loop
let cooltime = 0;
function mainloop(delta) {
  if (isKeyDown("ArrowRight")) {
    cat.x += cat_v;
  } if (isKeyDown("ArrowLeft")) {
    cat.x -= cat_v;
  } if (isKeyDown("ArrowUp")) {
    cat.y -= cat_v;
  } if (isKeyDown("ArrowDown")) {
    cat.y += cat_v;
  }
  if (isKeyDown(" ") && cooltime <= 0) {
    vx = [-6, 0, 6];
    vy = [-8, -10, -8];
    for (i = 0; i < 3; ++i) {
      let new_hand = ImageObject("cat_hand.png");
      new_hand.anchor.set(0.5, 0.5);
      new_hand.x = cat.x;
      new_hand.y = cat.y;
      new_hand.vx = vx[i];
      new_hand.vy = vy[i];
      addObject(new_hand);
      hands.push(new_hand);
    }
    cooltime = 10;
  } else {
    cooltime--;
  }
  hands.forEach((hand) => {
    hand.x += hand.vx;
    hand.y += hand.vy;
  });
}
