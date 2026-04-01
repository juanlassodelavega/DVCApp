# DVCApp

DVCApp is a decentralized venture capital demo built with Truffle, Solidity, Bootstrap, and MetaMask. It lets users explore a portfolio-style investor flow, a startup workspace, and an admin dashboard from the same codebase.

## Requirements

- Node.js and npm
- Truffle
- Ganache
- MetaMask

## Setup

```bash
npm install
truffle migrate --reset
npm run dev
```

## Useful Commands

```bash
npm run compile
npm run test
npm run build:pages
```

## Deploy on GitHub Pages

This project is static on the frontend (`client/`) and can be deployed to GitHub Pages.

### 1) Push with the Pages workflow

- The repository includes `.github/workflows/deploy-pages.yml`.
- On every push to `main`, GitHub Actions builds a static bundle and deploys it.

### 2) Enable Pages in GitHub settings

- Go to **Settings > Pages**.
- Set **Source** to **GitHub Actions**.

### 3) Keep the contract artifact updated

The frontend fetches `InvestmentsContract.json` at the site root.

Before pushing a deployment update:

```bash
truffle migrate --reset --network <your-network>
npm run build:pages
```

`npm run build:pages` copies `build/contracts/InvestmentsContract.json` into `client/InvestmentsContract.json` for local checks, and the GitHub Actions workflow also injects the same artifact into the published bundle.

### Important blockchain note

If your artifact only contains Ganache (`5777`) addresses, the app will work only against your local chain. For public usage on GitHub Pages, deploy the contract to a public testnet (for example Sepolia), then publish the updated artifact.

## Project Structure

- `contracts/` contains the Solidity smart contract.
- `migrations/` contains the deployment script.
- `client/` contains the static app, styles, and page scripts.
- `test/` contains the Truffle tests.

## Notes

- The investor dashboard lives in `client/investments.html`.
- The startup workspace lives in `client/investors.html`.
- The admin dashboard lives in `client/admin.html`.
- Shared startup data is in `client/js/data/startups.js`.

## Built With

- Truffle Suite
- Solidity
- Bootstrap 5
- Chart.js
- SweetAlert2

## Author

Juan Lasso de la Vega - [@juanlassodelavega](https://github.com/juanlassodelavega)
