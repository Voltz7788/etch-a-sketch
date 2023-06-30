function getGridSize() {
    const slider = document.querySelector(".gridSizeSlider");
    const value = document.querySelector(".gridSizeValue");
    value.textContent = slider.value;
    slider.oninput = () => {
        value.textContent = slider.value;
    }
};


function generateGrid() {

};

getGridSize()