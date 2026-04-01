import App from './app.js';
import DVCApp from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('investmentForm');
  const startupSelect = document.getElementById('startupsSelect');

  if (!form || !startupSelect) {
    return;
  }

  startupSelect.addEventListener('change', () => {
    App.renderStartupPreview();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const startupName = startupSelect.value;
    const duration = form.elements.time.value.trim();
    const amount = form.elements.amount.value.trim();

    if (!startupName || !duration || !amount) {
      await Swal.fire({
        title: 'Complete the form',
        text: 'Choose a startup and fill in the amount and duration fields.',
        icon: 'warning',
        confirmButtonText: 'Understood',
      });
      return;
    }

    try {
      await App.createInvestment(startupName, duration, amount);
      form.reset();
      DVCApp.renderStartupOptions(startupSelect);
      startupSelect.value = startupName;
      App.renderStartupPreview();

      await Swal.fire({
        title: 'Investment saved',
        text: `${startupName} was added to your portfolio.`,
        icon: 'success',
        confirmButtonText: 'Great',
      });
    } catch (error) {
      await Swal.fire({
        title: 'Transaction failed',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try again',
      });
    }
  });
});
