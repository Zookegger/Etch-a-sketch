const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = "#000000";
const DEFAULT_BUTTON_HEIGHT = 35;

const grid = document.getElementById("grid");
const body = document.getElementById("body");

const buttonContainer = document.getElementById("button-container");
const clear = createButton("Clear canvas", "clear-button", clearGrid);
const primaryColorPicker = createColorPicker(DEFAULT_COLOR, "primaryColorPicker", (e) => currentPrimaryColor = e.target.value); 
const secondaryColorPicker = createColorPicker(DEFAULT_COLOR, "secondaryColorPicker", (e) => currentSecondaryColor = e.target.value);
const slider = document.createElement("input");
slider.setAttribute("id", "slider");
slider.type = "range";
slider.min = "1"
slider.max = "128";
slider.step = "1";
slider.value = 10;
slider.addEventListener("input", () => {
    sliderValue.value = slider.value;
    setupGrid(slider.value);
});

const sliderValue = document.createElement("input");
sliderValue.setAttribute("id", "sliderValue");
sliderValue.type = "text";
sliderValue.value = slider.value;
sliderValue.addEventListener("input", () => {
    const value = Math.max(slider.min, Math.min(slider.max, sliderValue.value));
    slider.value = value;
    setupGrid(value);
})

function createColorPicker(color, id, inputHandler) {
    const colorPicker = document.createElement("input");
    colorPicker.setAttribute("id", id);
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

function createButton(text, id, eventHandler) {
    const button = document.createElement("button");
    button.setAttribute("id" , id);
    button.innerText = text;
    button.addEventListener("mousedown", eventHandler);
    return button;
}

const eraser = createButton("Eraser", "eraser-button", erase);
eraser.style.backgroundColor = "#FF0000";
eraser.style.color = "#FFFFFF";

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

let eraserStatus = true; 
function erase(e) {
    console.log(eraserStatus);
    eraserStatus = !eraserStatus;
    if (eraserStatus === false) {
        currentPrimaryColor = "#FFFFFF";
        eraser.style.backgroundColor = "#3ef32e";
        eraser.style.color = "#000000";
    }
    if (eraserStatus === true) {
        eraser.style.backgroundColor = "#FF0000";
        eraser.style.color = "#FFFFFF";
        currentPrimaryColor = primaryColorPicker.value;
    }
}

function clearGrid() {
    setupGrid(slider.value);
}

setupGrid(DEFAULT_SIZE);

clear.style.height = `${DEFAULT_BUTTON_HEIGHT}px`;
eraser.style.height = `${DEFAULT_BUTTON_HEIGHT}px`;
primaryColorPicker.style.height = `${DEFAULT_BUTTON_HEIGHT}px`;
secondaryColorPicker.style.height = `${DEFAULT_BUTTON_HEIGHT}px`;

sliderValue.style.width = '19px';

buttonContainer.appendChild(clear);
buttonContainer.appendChild(primaryColorPicker);
buttonContainer.appendChild(secondaryColorPicker);
buttonContainer.appendChild(eraser);
buttonContainer.appendChild(slider);
buttonContainer.appendChild(sliderValue);
body.appendChild(buttonContainer);