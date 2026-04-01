const App = {
  contract: null,
  account: null,
  balanceEth: 0,
  startupSelect: null,
  startupCatalog: null,
  investmentsList: null,
  accountLabel: null,
  balanceLabel: null,
  portfolioCountLabel: null,
  capitalLabel: null,
  openCountLabel: null,
  connectionLabel: null,

  init: async () => {
    App.cacheElements();
    App.renderStartupOptions();
    App.renderStartupCatalog();
    App.renderFeaturedStartup();
    App.bindGlobalActions();

    try {
      await App.loadWallet();
      await App.loadContract();
      await App.renderInvestments();
    } catch (error) {
      App.renderConnectionState(error.message);
    }
  },

  cacheElements: () => {
    App.startupSelect = document.getElementById('startupsSelect');
    App.startupCatalog = document.getElementById('startupCatalog');
    App.investmentsList = document.getElementById('investmentsList');
    App.accountLabel = document.getElementById('account');
    App.balanceLabel = document.getElementById('balance');
    App.portfolioCountLabel = document.getElementById('portfolioCount');
    App.capitalLabel = document.getElementById('capitalCommitted');
    App.openCountLabel = document.getElementById('openCommitments');
    App.connectionLabel = document.getElementById('connectionState');
  },

  bindGlobalActions: () => {
    document.querySelectorAll('[data-action="receipt"]').forEach((button) => {
      button.addEventListener('click', () => App.openReceipt());
    });
  },

  renderStartupOptions: () => {
    if (!App.startupSelect) {
      return;
    }

    DVCApp.renderStartupOptions(App.startupSelect);
  },

  renderStartupCatalog: () => {
    if (!App.startupCatalog) {
      return;
    }

    App.startupCatalog.innerHTML = DVCAppData.startups
      .map((startup) => `
        <div class="col-md-6 col-xl-4">
          ${DVCApp.startupCardMarkup(startup)}
          <button type="button" class="btn btn-outline-light btn-sm mt-3 w-100" data-startup-select="${startup.name}">
            Select ${startup.name}
          </button>
        </div>
      `)
      .join('');

    App.startupCatalog.querySelectorAll('[data-startup-select]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!App.startupSelect) {
          return;
        }

        App.startupSelect.value = button.dataset.startupSelect;
        App.startupSelect.dispatchEvent(new Event('change'));
        document.getElementById('investmentForm')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },

  renderFeaturedStartup: () => {
    const featuredTitle = document.getElementById('featuredStartupTitle');
    const featuredSummary = document.getElementById('featuredStartupSummary');
    const featuredDetails = document.getElementById('featuredStartupDetails');

    if (!featuredTitle || !featuredSummary || !featuredDetails) {
      return;
    }

    const startup = DVCAppData.featuredStartup;
    featuredTitle.textContent = startup.name;
    featuredSummary.textContent = startup.description;
    featuredDetails.innerHTML = `
      <li>${startup.stage}</li>
      <li>${startup.targetEth} ETH target</li>
      <li>${startup.location}</li>
      <li>${startup.founderLine}</li>
      <li>${startup.rationale}</li>
    `;
  },

  loadWallet: async () => {
    const provider = DVCApp.getProvider();

    if (!provider) {
      throw new Error('MetaMask is required to load wallet data.');
    }

    const accounts = await DVCApp.requestAccounts();
    App.account = accounts[0];

    const balanceHex = await provider.request({
      method: 'eth_getBalance',
      params: [App.account, 'latest'],
    });

    App.balanceEth = DVCApp.weiToEth(balanceHex);
    App.renderWallet();
  },

  renderWallet: () => {
    if (App.accountLabel) {
      App.accountLabel.textContent = App.account || 'Not connected';
    }

    if (App.balanceLabel) {
      App.balanceLabel.textContent = DVCApp.formatEth(App.balanceEth);
    }

    if (App.connectionLabel) {
      App.connectionLabel.textContent = 'Wallet connected';
    }
  },

  renderConnectionState: (message) => {
    if (App.accountLabel) {
      App.accountLabel.textContent = 'Wallet unavailable';
    }

    if (App.balanceLabel) {
      App.balanceLabel.textContent = '0 ETH';
    }

    if (App.connectionLabel) {
      App.connectionLabel.textContent = message;
    }
  },

  loadContract: async () => {
    App.contract = await DVCApp.loadContract();
  },

  renderInvestments: async () => {
    if (!App.investmentsList || !App.contract) {
      return;
    }

    const totalInvestments = Number(await App.contract.investmentCounter());

    if (App.portfolioCountLabel) {
      App.portfolioCountLabel.textContent = totalInvestments.toString();
    }

    if (totalInvestments === 0) {
      App.investmentsList.innerHTML = `
        <div class="empty-state">
          <h3 class="h5 mb-2">No investments yet</h3>
          <p class="mb-0 text-body-secondary">Pick a startup and submit the first commitment.</p>
        </div>
      `;

      if (App.capitalLabel) {
        App.capitalLabel.textContent = '0 ETH';
      }

      if (App.openCountLabel) {
        App.openCountLabel.textContent = '0 open';
      }

      return;
    }

    const renderedInvestments = [];
    let totalCapital = 0;
    let openCommitments = 0;

    for (let investmentId = 1; investmentId <= totalInvestments; investmentId++) {
      const investment = await App.contract.investments(investmentId);
      const startup = DVCApp.getStartup(investment.startup) || { name: investment.startup, targetEth: investment.amount };
      const amount = Number(investment.amount);
      totalCapital += Number.isNaN(amount) ? 0 : amount;

      if (!investment.completed) {
        openCommitments++;
      }

      renderedInvestments.push(`
        <article class="investment-card">
          <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <p class="eyebrow mb-1">${startup.sector || 'Portfolio investment'}</p>
              <h3 class="h5 mb-1">${startup.name}</h3>
              <p class="mb-0 text-body-secondary">${startup.description || 'Committed capital recorded on-chain.'}</p>
            </div>
            <span class="status ${investment.completed ? 'status-closed' : 'status-open'}">${investment.completed ? 'Closed' : 'Open'}</span>
          </div>
          <div class="investment-card__meta">
            <span><strong>Amount:</strong> ${DVCApp.formatEth(investment.amount)}</span>
            <span><strong>Duration:</strong> ${investment.duration}</span>
            <span><strong>Created:</strong> ${DVCApp.formatDate(investment.createdAt)}</span>
          </div>
          <div class="d-flex gap-2 flex-wrap mt-3">
            <button type="button" class="btn btn-light btn-sm" data-action="receipt">View receipt</button>
            <button type="button" class="btn btn-outline-light btn-sm" data-toggle-investment="${investment.id}">
              ${investment.completed ? 'Reopen' : 'Close'} investment
            </button>
          </div>
        </article>
      `);
    }

    App.investmentsList.innerHTML = renderedInvestments.join('');

    if (App.capitalLabel) {
      App.capitalLabel.textContent = DVCApp.formatEth(totalCapital);
    }

    if (App.openCountLabel) {
      App.openCountLabel.textContent = `${openCommitments} open`;
    }

    App.investmentsList.querySelectorAll('[data-action="receipt"]').forEach((button) => {
      button.addEventListener('click', () => App.openReceipt());
    });

    App.investmentsList.querySelectorAll('[data-toggle-investment]').forEach((button) => {
      button.addEventListener('click', () => App.toggleDone(button.dataset.toggleInvestment));
    });
  },

  createInvestment: async (startup, duration, amount) => {
    if (!App.contract) {
      throw new Error('The contract is not connected.');
    }

    await App.contract.createInvestment(startup, duration, amount, {
      from: App.account,
    });

    await App.renderInvestments();
  },

  toggleDone: async (investmentId) => {
    if (!App.contract) {
      return;
    }

    await App.contract.toggleDone(investmentId, {
      from: App.account,
    });

    await App.renderInvestments();
  },

  openReceipt: () => {
    window.open('./docs/receipt.pdf', '_blank', 'noopener');
  },
};

window.App = App;
window.showReceipt = () => App.openReceipt();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
