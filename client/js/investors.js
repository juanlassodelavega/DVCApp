document.addEventListener('DOMContentLoaded', () => {
  const featuredStartup = document.getElementById('featuredStartup');
  const investorList = document.getElementById('investorList');
  const editButton = document.getElementById('editStartup');
  const cancelButton = document.getElementById('cancelInvestment');

  if (featuredStartup) {
    renderFeaturedStartup(featuredStartup);
  }

  if (investorList) {
    investorList.innerHTML = DVCAppData.investorHighlights.map(DVCApp.investorCardMarkup).join('');
  }

  editButton?.addEventListener('click', edit);
  cancelButton?.addEventListener('click', cancel);
});

function renderFeaturedStartup(container) {
  const startup = DVCAppData.featuredStartup;

  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
      <div>
        <p class="eyebrow mb-1">Startup profile</p>
        <h2 class="h4 mb-2">${startup.name}</h2>
        <p class="mb-0 text-body-secondary">${startup.description}</p>
      </div>
    </div>
    <hr class="my-4">
    <div class="startup-meta mb-3">
      <span>${startup.stage}</span>
      <span>${startup.targetEth} ETH target</span>
      <span>${startup.location}</span>
    </div>
    <p class="mb-3 text-body-secondary">${startup.traction}</p>
    <p class="mb-0 text-body-secondary">${startup.founderLine}</p>
  `;
}

async function edit() {
  await Swal.fire({
    title: 'Edit startup profile',
    icon: 'info',
    html:
      '<input class="form-control my-2" type="text" placeholder="Startup name">' +
      '<input class="form-control" type="text" placeholder="Funding target">' +
      '<textarea class="form-control my-2" rows="3" placeholder="Short description"></textarea>',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save changes',
    focusConfirm: false,
  });
}

async function cancel() {
  const result = await Swal.fire({
    title: 'Cancel this investment?',
    text: 'This will only update the interface state in this demo.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#ef4444',
    confirmButtonText: 'Yes, cancel it',
    cancelButtonText: 'Keep it active',
  });

  if (result.isConfirmed) {
    await Swal.fire('Investment cancelled', 'The investment state has been updated.', 'success');
  }
}
