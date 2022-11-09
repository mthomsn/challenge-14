const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#usernameLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } 
    else {
      alert('Failed to log in.');
    }
  }
};

const sendToSignup = () => {
  document.location.replace('/signup');
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#sign-up')
  .addEventListener('click', sendToSignup);