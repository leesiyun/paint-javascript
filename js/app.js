const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const getCanvasViewportHeight = function(viewport) {
  const height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (viewport * height) / 100;
};

const getCanvasViewportWidth = function(viewport) {
  const width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (viewport * width) / 100;
};

const CANVAS_SIZE = Math.min(
  getCanvasViewportHeight(75),
  getCanvasViewportWidth(75)
);

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
  event.preventDefault();
  //console.log(event);
  const x = event.offsetX || event.targetTouches[0].pageX;
  const y = event.offsetY || event.targetTouches[0].pageY;
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
    ctx.beginPath();
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
  canvas.addEventListener("contextmenu", ctxMenuHandler);
  canvas.addEventListener("touchstart", startPainting);
  canvas.addEventListener("touchend", stopPainting);
  canvas.addEventListener("touchmove", onMouseMove);
  canvas.addEventListener("touchcancel", stopPainting);
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
