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

            if (routeFound) {
                localStorage.setItem('routeFoundData', JSON.stringify(routeFound));

                redirectToRouteInfoPage()
            } else {
                console.error("No route found.");
                alert("No route found.");
            }

        } catch (error) {
            console.error("API Request Error:", error);
        }
    } else {
        console.log("Necessary parameters are not selected.");
        alert("Please select all necessary parameters.");
    }
}


function redirectToRouteInfoPage() {
    window.location.href = '../routeinfo-page/routeinfo.html';
}