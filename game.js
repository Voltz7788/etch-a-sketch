function generateGrid() {
    // Grid slider and value output
    const slider = document.querySelector(".gridSizeSlider");
    const value = document.querySelector(".gridSizeValue");
    value.textContent = slider.value;
    slider.oninput = () => {
        value.textContent = slider.value;
    };

    // Grid width calculations
    totalDivs = slider.value**2;
    divWidth = 500/slider.value;

    // Create divs for grid
    for (let singleDiv = totalDivs; singleDiv > 0; singleDiv--) {
        const box = document.createElement("div");
        let gridContainer = document.querySelector(".gridContainer");
        gridContainer.appendChild(box);
    };
};

generateGrid()
