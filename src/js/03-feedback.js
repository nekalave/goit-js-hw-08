import throttle from 'lodash.throttle';

const formFeed = document.querySelector('.feedback-form');
const emailInput = document.querySelector('form input[name="email"]');
const emailMessage = document.querySelector('form textarea[name="message"]');

const savedState = localStorage.getItem('feedback-form-state');
if (savedState) {
  const parsedState = JSON.parse(savedState);
  if (parsedState.email) {
    emailInput.value = parsedState.email;
  }
  if (parsedState.message) {
    emailMessage.value = parsedState.message;
  }
}

const { email, message } = formFeed.elements;

formFeed.addEventListener('input', throttle((event) => {
  const feedBack = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedBack));
}, 500));

formFeed.addEventListener('submit', (event) => {
  event.preventDefault();
  const { email: {value: email}, message: {value: message} } = event.currentTarget;
  if (email === '' || message === '') {
    return alert('Please fill in all the fields!');
  }
  console.log({
    email,
    message,
  });
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
});