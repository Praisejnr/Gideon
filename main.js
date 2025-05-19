// Global variables
let isRunning = false;

// HTML elements
const voiceCon = document.querySelector(".voice-box");

// Get voice recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = true;

// Voice container click event
voiceCon.addEventListener("click", () => {
  isRunning = !isRunning;

  if (isRunning) {
    voiceCon.style.animation = "voicing 2s infinite";
    recognition.start();
  } else {
    voiceCon.style.animation = "none";
    recognition.stop();
  }
});

// Restart recognition if still running
recognition.onend = () => {
  if (isRunning) {
    recognition.start();
  }
};

// Handle result
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  console.log("Heard:", transcript); // 👈 helpful debug
  respond(transcript);
};

function respond(message) {
  let reply = "";

  if (
    message.includes("gideon") ||
    message.includes("hello") ||
    message.includes("hi")
  ) {
    reply = "Hello, good day sir. How may I help you today?";
  } else if (message.includes("bye")) {
    reply = "Bye, sir.";
    isRunning = false; // 👈 stop everything after goodbye
    voiceCon.style.animation = "none";
  } else {
    reply =
      "Sorry, I could not understand what you said. Can you please try again?";
  }

  // Speak response
  const utter = new SpeechSynthesisUtterance(reply);
  utter.onend = () => {
    if (isRunning) {
      recognition.start();
    }
  };

  speechSynthesis.speak(utter);
}
