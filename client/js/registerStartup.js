document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registerStartupButton')?.addEventListener('click', register);
});

function register() {
  Swal.fire({
    title: 'Startup registration complete',
    text: 'Your startup profile is ready to be reviewed.',
    icon: 'success',
    confirmButtonText: 'Back to login',
  }).then(() => {
    window.location = 'index.html';
  });
}

window.register = register;
