window.addEventListener('load', function() {
    const returnButton = document.getElementById("returnButton");
    returnButton.textContent = "Route info";
});

//ELEMENTS
const fromButtons = document.querySelectorAll(".fromlocation");
const toButtons = document.querySelectorAll(".tolocation");

const timeInput = document.getElementById("timeInput");
const nowButton = document.getElementById("nowButton");
const slider = document.querySelector(".transfertime-slider");
const transferTimeValue = document.querySelector(".transfertime-value");
transferTimeValue.textContent = slider.value;

const planButton = document.getElementById("planButton");


//EVENT LISTENERS
returnButton.addEventListener("click", function() {
    window.location.href = "../routeinfo-page/routeinfo.html";
});
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
slider.addEventListener("input", () => {
    transferTimeValue.textContent = slider.value;
});
nowButton.addEventListener("click", function() {
    nowButton.classList.toggle("selected");
});
planButton.addEventListener("click", handlePlanButton);

async function handlePlanButton() {
    const selectedFromLocation = document.querySelector(".fromlocation.selected").innerText;
    const selectedToLocation = document.querySelector(".tolocation.selected").innerText;
    const time = getTime();
    const transferTime = slider.value

    if (selectedFromLocation !== null && selectedToLocation !== null && time && transferTime) {
        console.log("All necessary parameters are selected.");
        await service(selectedFromLocation, selectedToLocation, time, transferTime)
        window.location.href = "../routeinfo-page/routeinfo.html";
    } else {
        console.log("Necessary parameters are not selected.");
        alert("Please select all necessary parameters.");
    }
}

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
