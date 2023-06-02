import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notify.warning('Please choose a date in the future');
      return;
    }

    const startBtn = document.querySelector('[data-start]');
    startBtn.disabled = false;
  },
});

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countdownIntervalId = null;

startBtn.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = datePicker.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notify.warning('Please choose a date in the future');
    return;
  }

  let timeRemaining = selectedDate - currentDate;

  countdownIntervalId = setInterval(() => {
    timeRemaining -= 1000;
    if (timeRemaining < 0) {
      clearInterval(countdownIntervalId);
      startBtn.disabled = true;
      Notify.success('Countdown timer finished');
      return;
    }
    updateTimerUI(timeRemaining);
  }, 1000);
}

function updateTimerUI(timeRemaining) {
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, '0');

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}


