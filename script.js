const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = "#000000";

const grid = document.getElementById("grid");
const body = document.getElementById("body");

const clear = document.createElement('button');
clear.innerText = "Clear";
clear.addEventListener("mousedown", clearGrid);

const primaryColorPicker = document.createElement("input");
const secondaryColorPicker = document.createElement("input");
primaryColorPicker.type = "color";
secondaryColorPicker.type = "color";
primaryColorPicker.value = DEFAULT_COLOR;
secondaryColorPicker.value = DEFAULT_COLOR;

let currentPrimaryColor = primaryColorPicker.value;
let currentSecondaryColor = secondaryColorPicker.value;

primaryColorPicker.addEventListener("input", (e) => currentPrimaryColor = e.target.value);
secondaryColorPicker.addEventListener("input", (e) => currentSecondaryColor = e.target.value);

grid.addEventListener('contextmenu', (e) => e.preventDefault());

let mouseDown = false;
let leftMouseDown = false;
let rightMouseDown = false;

document.body.onmousedown = (e) => {
    mouseDown = true;
    if (e.button === 0) leftMouseDown = true;
    if (e.button === 2) rightMouseDown = true;
}
document.body.onmouseup = () => {
    mouseDown = false;
    leftMouseDown = false;
    rightMouseDown = false;
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    grid.innerHTML = '';

    for (let i = 0; i < (size * size); i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("grid-pixel");
    
        pixel.addEventListener("mousedown", changeColor);
        pixel.addEventListener("mouseover", changeColor);
        grid.appendChild(pixel);
    }
}

function changeColor(event) {
    if (event.type === "mousedown") {
        if (event.button === 0) {
            event.target.style.backgroundColor = currentPrimaryColor;
            console.log("Right tap")
        } else if (event.button === 2) {
            event.target.style.backgroundColor = currentSecondaryColor;
            console.log("left tap")
        }
    }
    
    if (event.type === "mouseover" && mouseDown) {
        if (leftMouseDown) {
            event.target.style.backgroundColor = currentPrimaryColor;
            console.log("Right drag")
        } else if (rightMouseDown) {
            event.target.style.backgroundColor = currentSecondaryColor;
            console.log("left drag")
        }
    }
}


function clearGrid() {
    setupGrid(DEFAULT_SIZE);
}

setupGrid(DEFAULT_SIZE);

body.appendChild(clear);
body.appendChild(primaryColorPicker);
body.appendChild(secondaryColorPicker);