(function (global) {
  const app = (global.DVCApp = global.DVCApp || {});

  app.getStartup = (name) => {
    const startups = global.DVCAppData?.startups || [];
    return startups.find((startup) => startup.name === name) || null;
  };

  app.formatEth = (value) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return '0 ETH';
    }

    return `${numericValue.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    })} ETH`;
  };

  app.formatWeiAsEth = (weiValue) => app.formatEth(app.weiToEth(weiValue));

  app.formatDate = (timestamp) =>
    new Date(Number(timestamp) * 1000).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  app.weiToEth = (weiValue) => {
    const weiString = typeof weiValue === 'string' ? weiValue : String(weiValue);

    if (weiString.startsWith('0x')) {
      return Number(BigInt(weiString)) / 1e18;
    }

    return Number(weiString) / 1e18;
  };

  app.ethToWei = (ethValue) => {
    const normalizedValue = String(ethValue).trim();

    if (!normalizedValue) {
      return '0';
    }

    const [wholePart, fractionalPart = ''] = normalizedValue.split('.');
    const paddedFraction = `${fractionalPart}000000000000000000`.slice(0, 18);
    const wholeWei = BigInt(wholePart || '0') * 1000000000000000000n;
    const fractionWei = BigInt(paddedFraction || '0');

    return (wholeWei + fractionWei).toString();
  };

  app.getProvider = () => {
    if (global.ethereum) {
      return global.ethereum;
    }

    if (global.web3?.currentProvider) {
      return global.web3.currentProvider;
    }

    return null;
  };

  app.requestAccounts = async () => {
    const provider = app.getProvider();

    if (!provider?.request) {
      throw new Error('MetaMask is required to use this application.');
    }

    return provider.request({ method: 'eth_requestAccounts' });
  };

  app.getConnectedAccount = async () => {
    const provider = app.getProvider();

    if (!provider?.request) {
      throw new Error('MetaMask is required to use this application.');
    }

    const accounts = await provider.request({ method: 'eth_accounts' });

    if (accounts.length > 0) {
      return accounts[0];
    }

    const requestedAccounts = await provider.request({ method: 'eth_requestAccounts' });
    return requestedAccounts[0];
  };

  app.loadContract = async () => {
    const provider = app.getProvider();

    if (!provider) {
      throw new Error('MetaMask is required to load the smart contract.');
    }

    const response = await fetch('./InvestmentsContract.json');
    const artifact = await response.json();
    const contract = TruffleContract(artifact);

    contract.setProvider(provider);
    return contract.deployed();
  };

  app.renderStartupOptions = (selectElement) => {
    if (!selectElement) {
      return;
    }

    const startups = global.DVCAppData?.startups || [];
    const options = ['<option value="" disabled selected hidden>Select a startup</option>']
      .concat(
        startups.map(
          (startup) => `<option value="${startup.name}">${startup.name}</option>`
        )
      )
      .join('');

    selectElement.innerHTML = options;
  };

  app.startupCardMarkup = (startup) => `
    <article class="startup-card h-100">
      <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <p class="eyebrow mb-1">${startup.sector}</p>
          <h3 class="h4 mb-2">${startup.name}</h3>
        </div>
        <span class="chip">${app.formatEth(startup.targetEth)}</span>
      </div>
      <p class="mb-3 text-body-secondary">${startup.description}</p>
      <div class="startup-meta">
        <span>${startup.location}</span>
        <span>${startup.teamSize}</span>
        <span>Founded ${startup.foundingYear}</span>
      </div>
      <p class="small mt-3 mb-0 text-body-secondary">${startup.highlight}</p>
    </article>
  `;

  app.investorCardMarkup = (entry) => `
    <article class="investor-card">
      <div class="d-flex justify-content-between align-items-start gap-3">
        <div>
          <h3 class="h5 mb-1">${entry.name}</h3>
          <p class="mb-0 text-body-secondary">${entry.duration} commitment</p>
        </div>
        <span class="status status-${entry.status.toLowerCase()}">${entry.status}</span>
      </div>
      <div class="investor-card__footer">
        <span>${entry.amount}</span>
        <span>${entry.date}</span>
      </div>
    </article>
  `;
})(window);
