
const darkModeSwitch =
darkModeSwitch.addEventListener("change", darkMode);



function darkMode() {
    const body = document.body;
    if (darkModeSwitch.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
}

