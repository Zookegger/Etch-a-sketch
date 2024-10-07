const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = "#000000";

const grid = document.getElementById("grid");
const body = document.getElementById("body");

const clear = document.createElement('button');
clear.innerText = "Clear";
clear.addEventListener("mousedown", clearGrid);

const colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.value = DEFAULT_COLOR;

let currentColor = colorPicker.value;

colorPicker.addEventListener("input", (e) => currentColor = e.target.value);
grid.addEventListener('oncontextmenu', (e) => e.preventDefault);

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true;}
document.body.onmouseup = () => {mouseDown = false;}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size * size); i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("grid-pixel");
        pixel.addEventListener("mousedown", changeColor);
        pixel.addEventListener("mouseover", changeColor);
        grid.appendChild(pixel);
    }
}

function changeColor(event) {
    if (event.type === "mouseover" && !mouseDown) return;
    event.target.style.backgroundColor = currentColor;
}


function clearGrid() {
    grid.innerHTML = '';
    setupGrid(DEFAULT_SIZE);
}

setupGrid(DEFAULT_SIZE);
body.appendChild(clear);
body.appendChild(colorPicker);