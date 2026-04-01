document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('resetButton')?.addEventListener('click', reset);
});

function reset() {
  Swal.fire({
    title: 'Reset email sent',
    text: 'Follow the instructions in your inbox to create a new password.',
    icon: 'success',
    confirmButtonText: 'Back to login',
  }).then(() => {
    window.location = 'index.html';
  });
}

window.reset = reset;
