const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const clear = document.getElementById("jsClear");
const mode = document.getElementById("jsMode");
const lineStatus = document.getElementById("lineWidthStatus");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const defaultColorBtn = document.getElementById("defaultColorBtn");

canvas.width = 600;
canvas.height = 600;
canvas.classList.add("strokeCursor");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = range.getAttribute("value");
lineStatus.setAttribute("value", ctx.lineWidth);

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  // canvas.addEventListener("mouseleave", stopPainting); //마우스 커서가 캔버스를 나갔다가 들어와도 이어그릴 수 있게 하기 위해 주석 처리
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);
}
if (range) {
  range.addEventListener("input", handleChangeRange);
}
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (clear) {
  clear.addEventListener("click", clearCanvas);
}
if (saveBtn) {
  saveBtn.addEventListener("click",handleSaveClick);
}

function handleCM(event) {
  event.preventDefault();
}

function handleChangeRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  lineStatus.setAttribute("value", size);
}

let painting = false;
function startPainting(event) {
  if (filling === false && event.button === 0) {
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

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  }
}

let filling = false;

function handleModeClick() {
  if (filling === true) {
    filling = false;
    canvas.classList.remove("fillCursor");
    canvas.classList.add("strokeCursor");
    mode.innerText = "Fill";
  } else {
    filling = true;
    canvas.classList.remove("strokeCursor");
    canvas.classList.toggle("fillCursor");
    mode.innerText = "Paint";
  }
}

function clearCanvas() {
  location.reload()
}

function handleSaveClick() {
  const image = canvas.toDataURL("png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS🎨";
  link.click();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  const colors = event.target.parentElement.children
  Array.from(colors).forEach((color) => color.classList.remove("selected"));
  event.target.classList.add("selected");
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

defaultColorBtn.click();