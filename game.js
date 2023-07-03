let gridColor = "#333333";

function createColorPicker() {
    const pickr = Pickr.create({
        el: '.color-picker',
        theme: 'nano', // or 'monolith', or 'nano'
    
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],
    
        components: {
    
            // Main components
            preview: true,
            opacity: true,
            hue: true,
    
            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: true,
                save: true
            }
        }
    });

    pickr.on("change", color => {
        deactivateRainbowMode();
        changeButtonColor("color");
        gridColor = (color.toHEXA().toString());
    });
};

function generateRainbow() {
    let colorCode = (Math.random() * 0xfffff * 1000000).toString(16);
    console.log(`#${colorCode.slice(0,6)}`);
    gridColor =`#${colorCode.slice(0,6)}`;
}


function activateRainbowMode() {
    const allGridDivs = document.querySelectorAll(".box");
    for (box of allGridDivs) {
        box.addEventListener("mouseenter", generateRainbow);
    }
};

function deactivateRainbowMode() {
    const allGridDivs = document.querySelectorAll(".box");
    for (box of allGridDivs) {
        box.removeEventListener("mouseenter", generateRainbow);
    };
}

function changeButtonColor(mode) {
    const colorButton = document.querySelector("#colorButton");
    const rainbowButton = document.querySelector("#rainbowButton");
    const eraserButton = document.querySelector("#eraserButton");
    switch (mode) {
        case "color":
            colorButton.style.backgroundColor = "#333333";
            colorButton.style.color = "#EFEFEF";
            rainbowButton.style.backgroundColor = "#EFEFEF";
            rainbowButton.style.color = "#333333";
            eraserButton.style.backgroundColor = "#EFEFEF";
            eraserButton.style.color = "#333333";
            break;
        case "rainbow":
            rainbowButton.style.backgroundColor = "#333333";
            rainbowButton.style.color = "#EFEFEF";
            eraserButton.style.backgroundColor = "#EFEFEF";
            eraserButton.style.color = "#333333";
            colorButton.style.backgroundColor = "#EFEFEF";
            colorButton.style.color = "#333333";
            break;
        case "eraser":
            eraserButton.style.backgroundColor = "#333333";
            eraserButton.style.color = "#EFEFEF";
            colorButton.style.backgroundColor = "#EFEFEF";
            colorButton.style.color = "#333333";
            rainbowButton.style.backgroundColor = "#EFEFEF";
            rainbowButton.style.color = "#333333";
            break;
    }
};

function setUpModeButtons() {
    const colorButton = document.querySelector("#colorButton");
    const rainbowButton = document.querySelector("#rainbowButton");
    const eraserButton = document.querySelector("#eraserButton");

    colorButton.style.backgroundColor = "#333333";
    colorButton.style.color = "#EFEFEF";

    colorButton.addEventListener("click", () => {
        gridColor = "#333333";
        deactivateRainbowMode();
        changeButtonColor("color");
    });
    rainbowButton.addEventListener("click", () => {
        activateRainbowMode();
        changeButtonColor("rainbow");
    });
    eraserButton.addEventListener("click", () => {
        gridColor = "white";
        deactivateRainbowMode();
        changeButtonColor("eraser");
    });
};


function setUpClearButton() {
    const clearButton = document.querySelector("#clearButton");
    const slider = document.querySelector(".gridSizeSlider");
    clearButton.addEventListener("click", () => {
        refreshGrid();
        generateGrid(slider.value);
    });
}

function refreshGrid() {
    const gridContainer = document.querySelector(".gridContainer");
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    };
};

function generateGrid(gridSize) {
    // Grid width calculations
    
    let totalDivs = gridSize**2;
    let divWidth = 500/gridSize;
    let drawToggle = false;

    // Add draw toggle to grid container
    let gridContainer = document.querySelector(".gridContainer");
    gridContainer.addEventListener("mousedown", (event) => {
        event.preventDefault();
        drawToggle = !drawToggle;
    });
    gridContainer.addEventListener("mouseup", (event) => {
        event.preventDefault();
        drawToggle = !drawToggle;
    });
    gridContainer.addEventListener("mouseleave", () => {
        drawToggle = false;
    })

    // Create divs for grid
    for (let singleDiv = totalDivs; singleDiv > 0; singleDiv--) {
        const gridContainer = document.querySelector(".gridContainer");
        const box = document.createElement("div");
        box.classList.add("box");
        box.draggable = false;
        box.style.backgroundColor = "white";
        box.style.width = `${divWidth}px`;
        box.addEventListener("click", () => {
            box.style.backgroundColor = `${gridColor}`
        });
        box.addEventListener("mouseenter", () => {
            if (drawToggle) {
                box.style.backgroundColor = `${gridColor}`;
            };
        });

        gridContainer.appendChild(box);
    };
};

function getGridSize() {
    // Grid slider and value output
    createColorPicker()
    const slider = document.querySelector(".gridSizeSlider");
    const value = document.querySelector(".gridSizeValue");
    value.textContent = `${slider.value} x ${slider.value}`;
    generateGrid(slider.value);
    slider.oninput = () => {
        refreshGrid()
        value.textContent = `${slider.value} x ${slider.value}`;
        generateGrid(slider.value);
    };
};

function startApp() {
    getGridSize();

    // Initialise buttons
    setUpClearButton();
    setUpModeButtons();
};

startApp()


// maybe use switch case statements to toggle between
// colour mode, rainbow mode and eraser mode?