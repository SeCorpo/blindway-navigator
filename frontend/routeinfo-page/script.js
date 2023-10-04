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