document.addEventListener('DOMContentLoaded', function() {


    const defaultOptions = CookieHandler.getDefaultOptions();
    let preload_light_theme = CookieHandler.getBooleanCookie('preload_light_theme');
    let preload_lift = CookieHandler.getBooleanCookie('preload_lift');
    let preload_times_enabled = CookieHandler.getBooleanCookie('preload_times_enabled');
    let preload_transfer_minutes = parseInt(CookieHandler.getCookie('preload_transfer_minutes')) || defaultOptions.preload_transfer_minutes;

    const darkModeSwitch = document.getElementById("myonoffswitch");
    const body = document.body;
    window.addEventListener('load', function () {
        if (preload_light_theme) {
            body.classList.remove("dark-mode");
            darkModeSwitch.checked = false;
        } else {
            body.classList.add("dark-mode");
            darkModeSwitch.checked = true;
        }
    });



    darkModeSwitch.addEventListener("input", darkMode);

    function darkMode() {
        preload_light_theme = !darkModeSwitch.checked;
        CookieHandler.setBooleanCookie('preload_light_theme', preload_light_theme, 365); // Store for 365 days


        if (preload_light_theme) {

            body.classList.remove("dark-mode");
        } else {
            body.classList.add("dark-mode");
        }
    }
});