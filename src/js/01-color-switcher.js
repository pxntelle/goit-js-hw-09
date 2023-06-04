const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const COLOR_CHANGE_INTERVAL = 1000;
let intervalId = null;

// startBtn.disabled = false;
// stopBtn.disabled = true;

// startBtn.addEventListener('click', startColorSwitch);
// stopBtn.addEventListener('click', stopColorSwitch);

// function startColorSwitch() {
//   startBtn.disabled = true;
//   stopBtn.disabled = false;
//   changeBackgroundColor();
//   intervalId = setInterval(changeBackgroundColor, COLOR_CHANGE_INTERVAL);
// }

// function stopColorSwitch() {
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
//   clearInterval(intervalId);
// }

updateButtonState(false);

startBtn.addEventListener('click', startColorSwitch);
stopBtn.addEventListener('click', stopColorSwitch);

function startColorSwitch() {
  updateButtonState(true);
  changeBackgroundColor();
  intervalId = setInterval(changeBackgroundColor, COLOR_CHANGE_INTERVAL);
}

function stopColorSwitch() {
  updateButtonState(false);
  clearInterval(intervalId);
}

function updateButtonState(startEnabled) {
  startBtn.disabled = startEnabled;
  stopBtn.disabled = !startEnabled;
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
