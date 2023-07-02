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
};

function addColor(box) {
};

function clear(gridSize) {
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

    // Create divs for grid
    for (let singleDiv = totalDivs; singleDiv > 0; singleDiv--) {
        const gridContainer = document.querySelector(".gridContainer");
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.backgroundColor = "white";
        box.style.width = `${divWidth}px`;
        box.addEventListener("mouseenter", (event) => {
            box.style.backgroundColor = "#333333";
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

    clear();
};

getGridSize()

// maybe use switch case statements to toggle between
// colour mode, rainbow mode and eraser mode?

// for clear button, try call refreshGrid() followed by generateGrid()
// to generate a new grid instead of changing the div colour?
// if that doesn't work, change the div colour