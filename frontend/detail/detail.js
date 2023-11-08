const routeFoundData = sessionStorage.getItem('routeFoundData');

window.addEventListener('load', function() {

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
const previousButton = document.querySelector('.prev-btn');
const playButton = document.querySelector('.play-btn');
const nextButton = document.querySelector('.next-btn');


//EVENT LISTENERS
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



const slides = document.getElementsByClassName("transfer-info");
let slideIndex = 0;

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
    const container = document.querySelector('.string-container');

    container.textContent = '';

    for (let i = 0; i < array.length; i++) {
        const row = array[i];
        const newDiv = document.createElement('div');
        newDiv.className = 'transfer-info fade';

        setInnerHTMLText(newDiv, row, i)
        container.appendChild(newDiv);
    }
}
function setInnerHTMLText(newDiv, string, i) {
    newDiv.innerHTML = 'Stap ' + i + ' - ' + string;
    newDiv.style.fontSize = '26px';
    newDiv.style.textAlign = 'center';
}