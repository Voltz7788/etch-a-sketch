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
        const box = document.createElement("div");
        let gridContainer = document.querySelector(".gridContainer");
        gridContainer.appendChild(box);
        console.log(totalDivs);
    };
};



function getGridSize() {
    // Grid slider and value output
    const slider = document.querySelector(".gridSizeSlider");
    const value = document.querySelector(".gridSizeValue");
    value.textContent = slider.value;
    slider.oninput = () => {
        refreshGrid()
        value.textContent = slider.value;
        generateGrid(slider.value);
    };
};

getGridSize()
