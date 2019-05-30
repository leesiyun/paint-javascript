const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const vh = function(v) {
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
};

const vw = function(v) {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
};

let CANVAS_SIZE = Math.min(vh(70), vw(70));

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "#fff";
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = function() {
  painting = false;
};

const startPainting = function() {
  painting = true;
};

const onMouseMove = function(event) {
  //console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const colorClickHandler = function(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

const rangeChangeHandler = function(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const moveBtnClickHandler = function() {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
  } else {
    filling = true;
    modeBtn.innerText = "paint";
  }
};

/*const canvasClickHandler = function() {
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};*/

const ctxMenuHandler = function(event) {
  event.preventDefault();
};

const saveClickHandler = function() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "SiKetchBook";
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", onMouseMove);
  //canvas.addEventListener("click", canvasClickHandler);
  canvas.addEventListener("contextmenu", ctxMenuHandler);
  canvas.addEventListener("touchstart", startPainting, false);
  canvas.addEventListener("touchend", stopPainting, false);
  canvas.addEventListener("touchcancel", onMouseMove, false);
  canvas.addEventListener("touchmove", onMouseMove, false);
}

if (modeBtn) {
  modeBtn.addEventListener("click", moveBtnClickHandler);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", colorClickHandler)
);

if (range) {
  range.addEventListener("input", rangeChangeHandler);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveClickHandler);
}
