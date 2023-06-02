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
      Notiflix.Notify.warning('Please choose a date in the future');
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
    return Notify.warning('Please choose a date in the future');
  }

  const timeRemaining = selectedDate - currentDate;
  updateTimerUI(timeRemaining);

  countdownIntervalId = setInterval(() => {
    updateTimerUI(timeRemaining);
    timeRemaining -= 1000;

    if (timeRemaining < 0) {
      clearInterval(countdownIntervalId);
      startBtn.disabled = true;
      return Notify.success('Countdown timer finished');
    }
  }, 1000);
}
