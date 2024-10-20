let countdownInterval;
let originalColor = ''; // Declare originalColor globally
const audio = new Audio('audio.mp3'); // Path to your sound file

// Preload the audio to ensure it plays without delay
audio.preload = "auto"; 

function startCountdown() {
  const hours = parseInt(document.getElementById('hoursInput').value) || 0;
  const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
  const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
  
  let totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

  if (totalTimeInSeconds <= 0) {
    alert('Please enter a valid countdown time.');
    return;
  }

  const countdownDisplay = document.getElementById('countdownDisplay');

  // Store the original color using getComputedStyle
  if (originalColor === '') {
    originalColor = getComputedStyle(countdownDisplay).color;
  }

  // Set countdown display color to red
  countdownDisplay.classList.add('red');

  clearInterval(countdownInterval);

  updateDisplay(totalTimeInSeconds);  // Initial update
  countdownInterval = setInterval(() => {
    if (totalTimeInSeconds <= 0) {
      clearInterval(countdownInterval);
      playSound(); // Play sound immediately
      document.getElementById('countdownDisplay').innerText = "00:00:00"; // Set display to zero
      alert('Countdown finished!');

      // Remove the red color class and revert to original color
      countdownDisplay.classList.remove('red');
      countdownDisplay.style.color = originalColor;
      return;
    }

    totalTimeInSeconds--;

    updateDisplay(totalTimeInSeconds);  // Update the display for every tick
    createBubble();  // Create dynamic bubbles as countdown progresses
  }, 1000);
}

// Function to update the display in the correct format
function updateDisplay(totalTimeInSeconds) {
  const displayHours = String(Math.floor(totalTimeInSeconds / 3600)).padStart(2, '0');
  const displayMinutes = String(Math.floor((totalTimeInSeconds % 3600) / 60)).padStart(2, '0');
  const displaySeconds = String(totalTimeInSeconds % 60).padStart(2, '0');
  
  document.getElementById('countdownDisplay').innerText = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

function createBubble() {
  const bubbleContainer = document.getElementById('bubbleContainer');
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.style.left = Math.random() * 100 + '%';
  bubble.style.width = bubble.style.height = `${Math.random() * 60 + 20}px`;
  bubbleContainer.appendChild(bubble);
  
  // Remove bubble after animation
  setTimeout(() => {
    bubble.remove();
  }, 10000);
}

// Play sound when countdown finishes
function playSound() {
  audio.play().then(() => {
    console.log("Sound played successfully.");
  }).catch(error => {
    console.error("Failed to play sound: ", error);
  });
}

// Add an event listener to the start button
document.getElementById('startButton').addEventListener('click', startCountdown);
