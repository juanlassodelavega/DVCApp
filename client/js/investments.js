document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('investmentForm');
  const startupSelect = document.getElementById('startupsSelect');
  const startupPreview = document.getElementById('startupPreview');
  const startupCatalog = document.getElementById('startupCatalog');

  if (!form || !startupSelect) {
    return;
  }

  DVCApp.renderStartupOptions(startupSelect);
  renderPreview(startupSelect, startupPreview);
  renderCatalog(startupCatalog, startupSelect, startupPreview);

  startupSelect.addEventListener('change', () => {
    renderPreview(startupSelect, startupPreview);
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
      renderPreview(startupSelect, startupPreview);

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

function renderCatalog(container, startupSelect, startupPreview) {
  if (!container) {
    return;
  }

  container.innerHTML = DVCAppData.startups
    .map((startup) => `
      <div class="col-md-6 col-xl-4">
        <article class="startup-card h-100">
          <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <p class="eyebrow mb-1">${startup.sector}</p>
              <h3 class="h5 mb-2">${startup.name}</h3>
            </div>
            <span class="chip">${startup.targetEth} ETH</span>
          </div>
          <p class="mb-3 text-body-secondary">${startup.description}</p>
          <div class="startup-meta">
            <span>${startup.location}</span>
            <span>${startup.teamSize}</span>
          </div>
          <button type="button" class="btn btn-outline-light btn-sm mt-3 w-100" data-startup-select="${startup.name}">
            Select startup
          </button>
        </article>
      </div>
    `)
    .join('');

  container.querySelectorAll('[data-startup-select]').forEach((button) => {
    button.addEventListener('click', () => {
      startupSelect.value = button.dataset.startupSelect;
      startupSelect.dispatchEvent(new Event('change'));
      document.getElementById('investmentForm')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  renderPreview(startupSelect, startupPreview);
}

function renderPreview(startupSelect, startupPreview) {
  if (!startupPreview) {
    return;
  }

  const startup = DVCApp.getStartup(startupSelect.value) || DVCAppData.startups[0];

  startupPreview.innerHTML = `
    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
      <div>
        <p class="eyebrow mb-1">Ready to invest</p>
        <h2 class="h4 mb-2">${startup.name}</h2>
        <p class="mb-0 text-body-secondary">${startup.description}</p>
      </div>
      <span class="chip">${startup.targetEth} ETH target</span>
    </div>
    <div class="startup-meta mt-3">
      <span>${startup.location}</span>
      <span>${startup.teamSize}</span>
      <span>Founded ${startup.foundingYear}</span>
    </div>
  `;
}
