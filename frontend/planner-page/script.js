// JavaScript to handle button selection
const fromButtons = document.querySelectorAll(".fromlocation");
const toButtons = document.querySelectorAll(".tolocation");

const timeInput = document.getElementById("timeInput");
const nowButton = document.getElementById("nowButton");
const slider = document.querySelector(".transfertime-slider");
const valueDisplay = document.querySelector(".transfertime-value");

const planButton = document.getElementById("planButton");

fromButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove "selected" class from all "from" buttons
        fromButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        // Add "selected" class to the clicked "from" button
        button.classList.add("selected");
    });
});

toButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove "selected" class from all "to" buttons
        toButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        // Add "selected" class to the clicked "to" button
        button.classList.add("selected");
    });
});

nowButton.addEventListener("click", function() {
    // Toggle the "selected" class on the button
    nowButton.classList.toggle("selected");
});

valueDisplay.textContent = slider.value;
slider.addEventListener("input", () => {
    valueDisplay.textContent = slider.value;
});

// Function to handle the button click event
function handleButtonClick() {
    // Toggle the "selected" class to change the background color
    planButton.classList.toggle("selected");
}

// Add a click event listener to the button
planButton.addEventListener("click", handleButtonClick);