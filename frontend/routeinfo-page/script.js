window.addEventListener('load', function() {
    const returnButton = document.getElementById("returnButton");
    returnButton.textContent = "Return";

    if (routeFoundData) {
        const routeFound = JSON.parse(routeFoundData);
        const routeSteps = new RouteSteps(routeFound);

        inputSlides(routeSteps);
        showSlides(0)
        //sessionStorage.removeItem('routeFoundData');
    } else {
        console.error("No route found data available. Go back to last page");
    }
});

//ELEMENTS
const slides = document.getElementsByClassName("transfer-info");
let slideIndex = 0;

const previousButton = document.querySelector('.prev-btn');
const playButton = document.querySelector('.play-btn');
const nextButton = document.querySelector('.next-btn');

const routeFoundData = sessionStorage.getItem('routeFoundData');

//EVENT LISTENERS
returnButton.addEventListener("click", function() {
    window.location.href = "../planner-page/planner.html";
});
previousButton.addEventListener("click", () => {
    console.log('handlePreviousButtonClick')
    showSlides(slideIndex - 1);
});
playButton.addEventListener("click", handlePlayButtonClick);
nextButton.addEventListener("click", () => {
    console.log('handleNextButtonClick')
    showSlides(slideIndex + 1);
});


function handlePlayButtonClick() {
    //play audio
    //stop auto
    //start countdown timer till closest instap/uitstap
}


function showSlides(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }
    slides[slideIndex].style.display = "block";
}
function inputSlides(array) {
    const container = document.querySelector('.info-grid');

    container.textContent = '';

    for (let i = 0; i < array.length; i++) {
        const row = array[i];
        const newDiv = document.createElement('div');
        newDiv.className = 'transfer-info fade';

        // tableFormat(newDiv, row, i); // Pass newDiv, row, and i to standardText
        setInnerHTMLText(newDiv, row, i)
        container.appendChild(newDiv);
    }
}

function standardTextRouteFoundData(newDiv, row, i) {
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
function tableFormatRouteFoundData(newDiv, row, i) {
    newDiv.innerHTML =
        '<table style="text-align: left;">' +
        '<tr><th colspan="2">Track ' + (i + 1) + '</th></tr>' +
        '<tr><td>Beginstation:</td><td>' + row.start_station_name + '</td></tr>' +
        '<tr><td>Eindstation:</td><td>' + row.end_station_name + '</td></tr>' +
        '<tr><td>Vertrektijd:</td><td>' + row.timeOfDeparture + '</td></tr>' +
        '<tr><td>Aankomsttijd:</td><td>' + row.timeOfArrival + '</td></tr>' +
        '<tr><td>Vertrek perron:</td><td>' + row.departurePlatform + '</td></tr>' +
        '<tr><td>Aankomst perron:</td><td>' + row.arrivalPlatform + '</td></tr>' +
        '<tr><td>Trein type:</td><td>' + row.train_type + '</td></tr>' +
        '<tr><td>Uitstapzijde:</td><td>' + row.exitSide + '</td></tr>' +
        '</table>';
}
function setInnerHTMLText(newDiv, string, i) {
    newDiv.innerHTML = 'Stap ' + i + ' - ' + string;
    newDiv.style.fontSize = '26px';
    newDiv.style.textAlign = 'center';
}

//PLS MAKE NEW FUNCTION FOR OTHER TEXT OUTPUT



