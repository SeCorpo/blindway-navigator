const returnButton = document.getElementById("returnButton");
const whereAmIButton = document.getElementById("whereAmIButton");
const settingsButton = document.getElementById("settingsButton");
const settingsPopup = document.getElementById("settingsPopup");
const closeButton = document.getElementById("closeButton");
const darkModeSwitch = document.getElementById("myonoffswitch")

//EVENT LISTENERS
settingsButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
darkModeSwitch.addEventListener("change", darkMode);

function openPopup() {
    console.log('DEBUG: settingsButton clicked')
    settingsPopup.style.display = "block";
}
function closePopup() {
    console.log('DEBUG: settingsPopup close button pressed')
    settingsPopup.style.display = "none";
}

function darkMode() {
    const body = document.body;
    if (darkModeSwitch.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
}

