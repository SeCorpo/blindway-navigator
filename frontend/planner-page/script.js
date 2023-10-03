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
        fromButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});

toButtons.forEach((button) => {
    button.addEventListener("click", () => {
        toButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});

nowButton.addEventListener("click", function() {
    nowButton.classList.toggle("selected");
});
function getTime() {
    if (document.getElementById("nowButton").classList.contains("selected")) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;

    } else {

        return document.getElementById("timeInput").value + ':00';

    }
}
valueDisplay.textContent = slider.value;
slider.addEventListener("input", () => {
    valueDisplay.textContent = slider.value;
});
// Add a click event listener to the button
planButton.addEventListener("click", handlePlanButton);

async function handlePlanButton() {
    const selectedFromLocation = document.querySelector(".fromlocation.selected");
    const selectedToLocation = document.querySelector(".tolocation.selected");
    const time = getTime();
    const transferTime = slider.value

    if (selectedFromLocation && selectedToLocation && time && transferTime) {
        console.log("All necessary parameters are selected.");

        try {
            const response = await axios.get('http://localhost:3001/plan', {
                params: {
                    from: selectedFromLocation.innerText,
                    to: selectedToLocation.innerText,
                    time: time,
                    transferTime: transferTime
                }
            });

            const routeFound = response.data.routeFound;
            //Data handling
            printRoutesAsString(routeFound);

        } catch (error) {
            console.error("API Request Error:", error);
        }
    } else {
        console.log("Necessary parameters are not selected.");
        alert("Please select all necessary parameters.");
    }
}
function printRoutesAsString(routeFound) {
    try {

        let result = '';

        routeFound.forEach((row, index) => {
            result += 'Track: ' + (index + 1) + '\n';
            result += 'track_id: ' + row.track_id + '\n';
            result += 'start_station_name: ' + row.start_station_name + '\n';
            result += 'end_station_name: ' + row.end_station_name + '\n';
            result += 'timeOfDeparture: ' + row.timeOfDeparture + '\n';
            result += 'timeOfArrival: ' + row.timeOfArrival + '\n';
            result += 'departurePlatform: ' + row.departurePlatform + '\n';
            result += 'arrivalPlatform: ' + row.arrivalPlatform + '\n';
            result += '------------------\n';
        });
        console.log(result);
    } catch(error) {
        console.error('Cannot find route')
    }
}

