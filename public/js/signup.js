const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/new', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } 
    else {
      alert('Failed to sign up.');
    }
  }
};

const sendToLogin = () => {
  document.location.replace('/login');
};


document
  .querySelector('#login')
  .addEventListener('click', sendToLogin);

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);