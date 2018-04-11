// settings
backgroundColor = 0x7F7F7F;
width = 1024;
height = 768;

// load
loadImages([
  "cat.png",
  "cat_hand.png",
  "mouse.png"
]);

loadSounds([
    "sound.js/sounds/shoot.wav"
]);

// init
let cat;
let frame_rate_txt;
let points_txt;
let mouse_txt;
let layer_hands;
let layer_mouses;
let hands = [];
let mouses = [];
let shoot;
function init() {
  layer_hands = new Container();
  stage.addChild(layer_hands);
  layer_mouses = new Container();
  stage.addChild(layer_mouses);
  cat = ImageObject("cat.png");
  cat.anchor.set(0.5, 0.5);
  cat.x = 400;
  cat.y = 400;
  stage.addChild(cat);
  frame_rate_txt = new Text("Frame: 0fps");
  stage.addChild(frame_rate_txt);
  points_txt = new Text("Points: 0pt");
  points_txt.y = 40;
  stage.addChild(points_txt);
  mouse_txt = new Text("Mouse: X=0.0, Y=0.0, Up");
  mouse_txt.y = 80;
  stage.addChild(mouse_txt);
  shoot = sounds["sound.js/sounds/shoot.wav"];
}

const cat_v = 3;

// main loop
let cooltime = 0;
let cooltime_mouse = 0;
let points = 0;
function mainloop(delta) {
  frame_rate_txt.text = `Frame rate: ${ Math.round(60/delta).toString()  }fps`;
  points_txt.text = `Points: ${ points }pt`;
  mouse_txt.text = `Mouse: X=${ mouseX }, Y=${ mouseY }, ${ isMouseDown(0) ? "Down" : "Up" }`;
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
      layer_hands.addChild(new_hand);
      hands.push(new_hand);
      shoot.play();
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
    layer_mouses.addChild(new_mouse);
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
    if (!result) layer_hands.removeChild(hand);
    return result;
  });
  mouses = mouses.filter((mouse) => {
    const result = mouse.y < app.stage.height + 100 && mouse.hp > 0;
    if (!result) {
      layer_mouses.removeChild(mouse);
      points++;
    }
    return result;
  });
}
