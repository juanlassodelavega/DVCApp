document.addEventListener('DOMContentLoaded', () => {
  Swal.fire({
    title: 'Cookie notice',
    text: 'We use cookies to improve the experience and keep the demo flows running smoothly.',
    icon: 'info',
    confirmButtonText: 'Accept',
    confirmButtonColor: '#0ea5e9',
  });

  document.getElementById('loginButton')?.addEventListener('click', login);
});

function login() {
  const username = document.getElementById('username')?.value.trim().toLowerCase();

  const routes = {
    investor: 'investments.html',
    startup: 'investors.html',
    admin: 'admin.html',
  };

  if (routes[username]) {
    window.location = routes[username];
    return;
  }

  Swal.fire({
    title: 'Invalid credentials',
    text: 'Use investor, startup, or admin to explore the demo.',
    icon: 'error',
    confirmButtonText: 'Try again',
  });
}

window.login = login;
