var synth = window.speechSynthesis;

// slides = div.transfer-info   || planner.js
// slideIndex = current slide   || planner.js
// playButton = button.play-btn || planner.js

const pitch = 1;
const rate = 1;

var voices = synth.getVoices();

var nl_NL = voices.find(voice => {
  return voice.lang == 'nl-NL';
});

function speak() {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }

  if (slides.textContent !== '') {
    const utterThis = new SpeechSynthesisUtterance(slides[slideIndex].textContent);

    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.voice = nl_NL;
    utterThis.pitch = pitch;
    utterThis.rate  = rate;
    synth.speak(utterThis);
  }
}

playButton.onclick = function () {
  console.log('onPlayButton')
  speak();
}