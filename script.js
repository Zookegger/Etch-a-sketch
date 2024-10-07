const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = "#000000";

const grid = document.getElementById("grid");
const body = document.getElementById("body");

const clear = createButton("Clear canvas", clearGrid);

const primaryColorPicker = createColorPicker(DEFAULT_COLOR, (e) => currentPrimaryColor = e.target.value); 
const secondaryColorPicker = createColorPicker(DEFAULT_COLOR, (e) => currentSecondaryColor = e.target.value);

function createColorPicker(color, inputHandler) {
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.value = color;
    colorPicker.addEventListener("input", inputHandler);
    return colorPicker;
}

let currentPrimaryColor = primaryColorPicker.value;
let currentSecondaryColor = secondaryColorPicker.value;

grid.addEventListener('contextmenu', (e) => e.preventDefault());

let mouseDown = false;
let leftMouseDown = false;
let rightMouseDown = false;

document.body.onmousedown = (e) => {
    mouseDown = true;
    leftMouseDown = (e.button === 0);
    rightMouseDown = (e.button === 2) ;
}
document.body.onmouseup = () => {
    mouseDown = false;
    leftMouseDown = false;
    rightMouseDown = false;
}

function createButton(text, eventHandler) {
    const button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("mousedown", eventHandler);
    return button;
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
        event.target.style.backgroundColor = (event.button === 0) ? currentPrimaryColor : currentSecondaryColor;
    }
    
    if (event.type === "mouseover" && mouseDown) {
        event.target.style.backgroundColor = (leftMouseDown) ? currentPrimaryColor : currentSecondaryColor;
    }
}


function clearGrid() {
    setupGrid(DEFAULT_SIZE);
}

setupGrid(DEFAULT_SIZE);
body.appendChild(clear);
body.appendChild(primaryColorPicker);
body.appendChild(secondaryColorPicker);