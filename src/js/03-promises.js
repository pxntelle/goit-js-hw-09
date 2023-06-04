import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form.form');
// const inputDelay = document.querySelector('input[name="delay"]');
// const inputStep = document.querySelector('input[name="step"]');
// const inputAmount = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  // let delay = Number(inputDelay.value);
  // let step = Number(inputStep.value);
  // let amount = Number(inputAmount.value);
  const { delay, step, amount } = event.target.elements;
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);
  let position = 0;
  form.reset();
  for (let i = 0; i < amountValue; i += 1) {
    position = i + 1;
    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
}
