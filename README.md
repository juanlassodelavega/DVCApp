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
```

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
