const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const clear = document.getElementById("jsClear");
const mode = document.getElementById("jsMode");
const lineStatus = document.getElementById("lineWidthStatus");
const INITIAL_COLOR = "#2c2c2c";

setCanvasSize();
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = range.getAttribute("value");
lineStatus.setAttribute("value", ctx.lineWidth);

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  // canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}
if (range) {
  range.addEventListener("input", handleChangeRange);
}
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
window.addEventListener("resize", setCanvasSize);
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (clear) {
  clear.addEventListener("click", () => location.reload());
}

function setCanvasSize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

let painting = false;
function startPainting() {
  if (filling === false) {
    painting = true;
  }
}
function stopPainting() {
  painting = false;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseEnter(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  ctx.moveTo(x, y);
}

function handleChangeRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  lineStatus.setAttribute("value", size);
}

let filling = false;

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  }
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  const colors = event.target.parentElement.children
  Array.from(colors).forEach((color) => color.classList.remove("selected"));
  event.target.classList.add("selected");
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
