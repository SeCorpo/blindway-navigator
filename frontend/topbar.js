const settingsPopup = document.getElementById("settingsObject");

const returnButton = document.getElementById("returnButton");
const whereAmIButton = document.getElementById("whereAmIButton");
const settingsButton = document.getElementById("settingsButton");


//EVENT LISTENERS
settingsButton.addEventListener("click", openPopup);

const settingsDocumentContent = settingsPopup.contentDocument;
const closeButton = settingsDocumentContent.getElementById("closeButton");
closeButton.addEventListener("click", closePopup);

const darkModeSwitch = settingsDocumentContent.getElementById("myonoffswitch");
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

