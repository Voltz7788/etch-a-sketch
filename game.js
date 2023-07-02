function refreshGrid() {
    const gridContainer = document.querySelector(".gridContainer");
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    };
};

function generateGrid(gridSize) {
    // Grid width calculations
    totalDivs = gridSize**2;
    divWidth = 500/gridSize;

    // Create divs for grid
    for (let singleDiv = totalDivs; singleDiv > 0; singleDiv--) {
        const gridContainer = document.querySelector(".gridContainer");
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${divWidth}px`;
        gridContainer.appendChild(box);
    };
};

function getGridSize() {
    // Grid slider and value output
    const slider = document.querySelector(".gridSizeSlider");
    const value = document.querySelector(".gridSizeValue");
    value.textContent = slider.value;
    generateGrid(slider.value);
    slider.oninput = () => {
        refreshGrid()
        value.textContent = slider.value;
        generateGrid(slider.value);
    };
};

getGridSize()

// maybe use switch case statements to toggle between
// colour mode, rainbow mode and eraser mode?

// for clear button, try call refreshGrid() followed by generateGrid()
// to generate a new grid instead of changing the div colour?
// if that doesn't work, change the div colour