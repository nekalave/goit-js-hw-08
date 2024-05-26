import throttle from 'lodash.throttle';

const formFeed = document.querySelector(".feedback-form");
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

formFeed.addEventListener('input', throttle((event) => {
const form = event.currentTarget;
const email = form.elements.email.value;
const message = form.elements.message.value;

const feedBack = {
  email: email,
  message: message
}

localStorage.setItem('feedback-form-state', JSON.stringify(feedBack))
},500, {'trailing': false }))

formFeed.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.elements.email.value === "" || form.elements.message.value === "") {
    return alert("Please fill in all the fields!");
  }
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  form.reset();
})