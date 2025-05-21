// Get voice recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = true;

// Global variables
let isRunning = false;

// HTML elements
const voiceCon = document.querySelector(".voice-box");

// Voice functions
voiceCon.addEventListener("click", () => {
  if (!isRunning) {
    recognition.start();
    voiceCon.style.animation = "voicing 2s infinite";
  } else {
    recognition.stop();
    voiceCon.style.animation = "none";
  }
  isRunning = !isRunning;
});

// Voice input
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  respond(transcript);
};

function respond(message) {
  let reply = "";
  if (message.includes("gideon") || message.includes("hi")) {
    reply = "Hello sir, how may I assist you today?";
  } else {
    reply = "Sorry, I don't understand what you said. Can you try again?";
  }

  const utter = new SpeechSynthesisUtterance(reply);
  utter.onend = () => {
    if (isRunning) {
      recognition.start();
    }
  };

  speechSynthesis.speak(utter); // <-- corrected here
}

fetch('http://localhost:5000/ping')
  .then(response => response.json())
  .then(data => {
    console.log('Server says:', data.message);
    alert(data.message); // Optional: show it in an alert
  })
  .catch(error => {
    console.error('Error connecting to backend:', error);
  });