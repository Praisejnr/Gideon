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
  sendToServer(transcript);
};

function sendToServer(transcript) {
  fetch("http://localhost:5000/receive", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({transcript})
  }
  )
  .then((response) => response.json())
  .then((data) => {
    const utter = new SpeechSynthesisUtterance(data.message);
  utter.onend = () => {
    if (isRunning) {
      recognition.start();
    }
  };

  speechSynthesis.speak(utter); // <-- corrected here
  })
  .catch((error) => {
    console.error("Error:", error)
  })
}

