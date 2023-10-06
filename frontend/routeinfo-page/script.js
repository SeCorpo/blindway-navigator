window.addEventListener('load', function() {
    initialize()
});


let slideIndex = 0;
const slides = document.getElementsByClassName("transfer-info");
showSlides(slideIndex);

const darkModeSwitch = document.getElementById("myonoffswitch")
const previousButton = document.querySelector('.prev-btn');
const playButton = document.querySelector('.play-btn');
const nextButton = document.querySelector('.next-btn');


//LISTENERS
darkModeSwitch.addEventListener("change", darkMode);
previousButton.addEventListener("click", handlePreviousButtonClick);
playButton.addEventListener("click", handlePlayButtonClick);
nextButton.addEventListener("click", handleNextButtonClick);

const routeFoundData = localStorage.getItem('routeFoundData');


function initialize() {
    if (routeFoundData) {
        // Parse the JSON data
        const routeFound = JSON.parse(routeFoundData);

        inputSlides(routeFound);
        showSlides(0)
        //localStorage.removeItem('routeFoundData');
    } else {
        console.error("No route found data available. Go back to last page");
        // Handle the case where there is no routeFound data in localStorage
    }
}


// Function to handle the "Previous" button click
function handlePreviousButtonClick() {
    console.log('handlePreviousButtonClick')
    showSlides(slideIndex - 1);
}
// Function to handle the "Next" button click
function handleNextButtonClick() {
    console.log('handleNextButtonClick')
    showSlides(slideIndex + 1);
}


// Function to handle the "Play" button click
function handlePlayButtonClick() {
    //play audio
    //stop auto
    //start countdown timer till closest instap/uitstap
}

function showSlides(n) {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Wrap around to the last slide if moving past the last slide
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }

    // Display the current slide
    slides[slideIndex].style.display = "block";
}

function inputSlides(routeFound) {
    const container = document.querySelector('.info-grid');

    container.textContent = '';

    for (let i = 0; i < routeFound.length; i++) {
        const row = routeFound[i];
        const newDiv = document.createElement('div');
        newDiv.className = 'transfer-info fade';

        standardText(newDiv, row, i); // Pass newDiv, row, and i to standardText

        container.appendChild(newDiv);
    }
}
function darkMode() {
    var body = document.body;
    if (darkModeSwitch.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
}
function standardText(newDiv, row, i) {
    newDiv.innerHTML =
        '<hr>' +
        '<p>Track: ' + (i + 1) + '</p>' +
        '<p>Beginstation: ' + row.start_station_name + '</p>' +
        '<p>Eindstation: ' + row.end_station_name + '</p>' +
        '<p>Vertrektijd: ' + row.timeOfDeparture + '</p>' +
        '<p>Aankomsttijd: ' + row.timeOfArrival + '</p>' +
        '<p>Vertrek perron: ' + row.departurePlatform + '</p>' +
        '<p>Aankomst perron: ' + row.arrivalPlatform + '</p>' +
        '<p>Trein type: ' + row.train_type + '</p>' +
        '<p>Uitstapzijde: ' + row.exitSide + '</p>' +
        '<hr>';
}
//PLS MAKE NEW FUNCTION FOR OTHER TEXT OUTPUT
