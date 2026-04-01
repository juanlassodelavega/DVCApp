document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registerButton')?.addEventListener('click', register);
});

function register() {
  if (document.getElementById('isStartup')?.checked) {
    window.location = 'registerStartup.html';
    return;
  }

  Swal.fire({
    title: 'Registration complete',
    text: 'You can now sign in with your new credentials.',
    icon: 'success',
    confirmButtonText: 'Go to login',
  }).then(() => {
    window.location = 'index.html';
  });
}

window.register = register;
