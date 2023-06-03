import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackForm = 'feedback-form-state';

form.addEventListener('input', throttle(formInput, 500));
form.addEventListener('submit', submitForm);

savedData();

function submitForm(e) {
  e.preventDefault();
  form.reset();
  localStorage.removeItem(feedbackForm);
}

function formInput() {
  localStorage.setItem(
    feedbackForm,
    JSON.stringify({ email: emailInput.value, message: messageInput.value })
  );
}

function savedData() {
  const savedFormData = localStorage.getItem(feedbackForm);
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);

    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}
