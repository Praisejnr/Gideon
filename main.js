//global variables
let voicing = false;

//html elements
const voiceCon = document.querySelector(".voice-box");

//voice container events
voiceCon.addEventListener("click", () => {
    voiceCon.style.animation = voicing ? "voicing 2s infinite" : "none";
    voicing = !voicing;
});

// get voice response for speech recognitioon
const SpeechRecognition = 