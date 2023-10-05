window.addEventListener('load', function() {
    initialize()
});


let slideIndex = 0;
const slides = document.getElementsByClassName("transfer-info");
showSlides(slideIndex);

const previousButton = document.querySelector('button[name="previous"]');
const playButton = document.querySelector('button[name="play"]');
const nextButton = document.querySelector('button[name="next"]');


//LISTENERS
previousButton.addEventListener("click", handlePreviousButtonClick);
playButton.addEventListener("click", handlePlayButtonClick);
nextButton.addEventListener("click", handleNextButtonClick);

const routeFoundData = localStorage.getItem('routeFoundData');


function initialize() {
    if (routeFoundData) {
        // Parse the JSON data
        const routeFound = JSON.parse(routeFoundData);

        inputSlides(routeFound);

        //localStorage.removeItem('routeFoundData');
    } else {
        console.error("No route found data available.");
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
    //alert("Play button clicked"); // Replace with your logic
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
        newDiv.innerHTML =
            '<hr>' +
            '<p>Track: ' + (i + 1) + '</p>' +
            '<p>Track id: ' + row.track_id + '</p>' +
            '<p>Start Station name: ' + row.start_station_name + '</p>' +
            '<p>End Station name: ' + row.end_station_name + '</p>' +
            '<p>Time of departure: ' + row.timeOfDeparture + '</p>' +
            '<p>Time of arrival: ' + row.timeOfArrival + '</p>' +
            '<p>Departure platform: ' + row.departurePlatform + '</p>' +
            '<p>Arrival platform: ' + row.arrivalPlatform + '</p>' +
            '<hr>';

        container.appendChild(newDiv);
    }
}