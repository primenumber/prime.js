// settings
backgroundColor = 0xFFFFFF;

// load
loadImages([
  "cat.png",
  "cat_hand.png",
  "mouse.png"
]);

// init
let cat;
let frame_rate_txt;
let hands = [];
let mouses = [];
function init() {
  cat = ImageObject("cat.png");
  cat.anchor.set(0.5, 0.5);
  cat.x = 400;
  cat.y = 400;
  addObject(cat);
  frame_rate_txt = TextObject("Frame: 0fps");
  addObject(frame_rate_txt);
}

const cat_v = 3;

// main loop
let cooltime = 0;
let cooltime_mouse = 0;
function mainloop(delta) {
  frame_rate_txt.text = "Frame rate: " + Math.round(60/delta).toString();
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
      new_hand.hp = 1;
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
  if (cooltime_mouse <= 0) {
    let new_mouse = ImageObject("mouse.png");
    new_mouse.x = Math.random() * (800 - new_mouse.width);
    new_mouse.y = -100;
    new_mouse.vx = 0;
    new_mouse.vy = 5;
    new_mouse.hp = 3;
    addObject(new_mouse);
    mouses.push(new_mouse);
    cooltime_mouse = 60;
  } else {
    cooltime_mouse--;
  }
  mouses.forEach((mouse) => {
    mouse.x += mouse.vx;
    mouse.y += mouse.vy;
    hands.forEach((hand) => {
      if (hitTestRectangle(mouse, hand)) {
        mouse.hp--;
        hand.hp--;
      }
    });
  });
  hands = hands.filter((hand) => {
    const result = hand.y > -100 && hand.hp > 0;
    if (!result) removeObject(hand);
    return result;
  });
  mouses = mouses.filter((mouse) => {
    const result = mouse.y < 700 && mouse.hp > 0;
    if (!result) removeObject(mouse);
    return result;
  });
}
