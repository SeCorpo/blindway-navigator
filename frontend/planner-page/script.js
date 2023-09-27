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
// Add a click event listener to the button
planButton.addEventListener("click", handleButtonClick);

function handleButtonClick() {
    // Get the selected "from" location
    const selectedFromLocation = document.querySelector(".fromlocation.selected");

    // Get the selected "to" location
    const selectedToLocation = document.querySelector(".tolocation.selected");

    // Get the time input value
    let selectedTime;

    if (document.getElementById("nowButton").classList.contains("selected")) {
        // If "Now" button is selected, use the current date and time
        const now = new Date();
        selectedTime = now.toISOString(); // Format as ISO string
    } else {
        // If "Now" button is not selected, use the time input value
        const timeInputValue = document.getElementById("timeInput").value;
        // Parse the time input value as a Date object (assuming it's in HH:mm format)
        const [hours, minutes] = timeInputValue.split(":");
        const selectedDate = new Date();
        selectedDate.setHours(hours);
        selectedDate.setMinutes(minutes);

        // Format the selected date as an ISO string
        selectedTime = selectedDate.toISOString();

    }

    // Get the transfer time value from the slider
    const transferTime = document.querySelector(".transfertime-slider").value;

    // Check if all necessary parameters are selected/filled
    if (selectedFromLocation && selectedToLocation && selectedTime) {
        // Construct the URL for the GET request with the selected parameters
        const apiUrl = `/your-api-endpoint?from=${selectedFromLocation.textContent}&to=${selectedToLocation.textContent}&time=${selectedTime}&transfertime=${transferTime}`;

        // Send a GET request using the fetch API
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                return response.json(); // Parse response as JSON
            })
            .then((data) => {
                // Handle the response data here
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error("Fetch Error:", error);
            });
    } else {
        // Handle the case where not all necessary parameters are selected/filled
        alert("Please select all necessary parameters.");
    }
}
