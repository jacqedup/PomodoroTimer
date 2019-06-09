// Buttons
var incrementSession = document.getElementById("incrementSession");
var decrementSession = document.getElementById("decrementSession");
var incrementBreak = document.getElementById("incrementBreak");
var decrementBreak = document.getElementById("decrementBreak");
var playBtn = document.getElementById("playBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resetBtn = document.getElementById("resetBtn");

// Displays
var sessionDisplay = document.getElementById("sessionTime");
var breakDisplay = document.getElementById("breakTime");
var timerDisplay = document.getElementById("timer");

// Active timer indicator
var sessionTitle = document.getElementById("session");
var breakTitle = document.getElementById("break");

// Variables
var sessionLength = 1500;  // session time in seconds
var breakLength = 300;  // break time in seconds
var countdown;

// Sound
const alarm = document.createElement('audio'); 
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  
  if (hours >= 1) {
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  } else {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
}

function timer() {
  if (sessionLength >= 0) {
    showSession();
  } else {
    sessionTitle.style.color = "#FFF";
    breakTitle.style.color = "#00D0FF";
    if (breakLength >= 0) {
      timerDisplay.innerHTML = formatTime(breakLength);
      if (breakLength < 1) {
        alarm.play();
      }
      breakLength--;
    } else {
      sessionLength = parseInt(sessionDisplay.textContent) * 60;
      breakLength = parseInt(breakDisplay.textContent) * 60;
      showSession();  
    }  
  }  
}

function showSession() {
  sessionTitle.style.color = "#00D0FF";
  breakTitle.style.color = "#FFF";
  timerDisplay.innerHTML = formatTime(sessionLength);
  if (sessionLength < 1) {
    alarm.play();
  }
  sessionLength--; 
}

// Increment and Decrement buttons function
incrementSession.addEventListener("click", () => {
  sessionLength = sessionLength + 60;
  sessionDisplay.innerHTML = sessionLength / 60;
  timerDisplay.innerHTML = formatTime(sessionLength);
});

decrementSession.addEventListener("click", () => {
  if (sessionLength < 120) {
    return sessionLength;
  } else {
    sessionLength = sessionLength - 60;
  }
  sessionDisplay.innerHTML = sessionLength / 60;
  timerDisplay.innerHTML = formatTime(sessionLength);
});

incrementBreak.addEventListener("click", () => {
  breakLength = breakLength + 60;
  breakDisplay.innerHTML = breakLength / 60;
});

decrementBreak.addEventListener("click", () => {
  if (breakLength < 120) {
    return breakLength;
  } else {
    breakLength = breakLength - 60;
  }
  breakDisplay.innerHTML = breakLength / 60;
});

playBtn.addEventListener("click", () => {
  showSession();
  countdown = setInterval(timer, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(countdown);
});

resetBtn.addEventListener("click", () => {
  clearInterval(countdown);
  sessionLength = 1500;  
  breakLength = 300;  
  sessionDisplay.innerHTML = sessionLength / 60;
  timerDisplay.innerHTML = formatTime(sessionLength);
  sessionTitle.style.color = "#00D0FF";
  breakDisplay.innerHTML = breakLength / 60;
  breakTitle.style.color = "#FFF";
});











