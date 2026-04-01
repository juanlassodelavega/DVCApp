import { DVCAppData } from './data/startups.js';

document.addEventListener('DOMContentLoaded', () => {
  renderSummary();
  renderCharts();

  const refreshButton = document.getElementById('refreshDashboard');
  refreshButton?.addEventListener('click', () => window.location.reload());
});

function renderSummary() {
  const stats = DVCAppData.adminStats;

  const transactions = document.getElementById('transactions');
  const date = document.getElementById('date');
  const ip = document.getElementById('ip');
  const wallets = document.getElementById('wallets');
  const capital = document.getElementById('adminCapital');

  if (transactions) {
    transactions.textContent = stats.totalTransactions.toLocaleString('en-US');
  }

  if (date) {
    date.textContent = stats.lastUpdated;
  }

  if (ip) {
    ip.textContent = Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join('.');
  }

  if (wallets) {
    wallets.textContent = stats.activeWallets.toLocaleString('en-US');
  }

  if (capital) {
    capital.textContent = `${stats.monthlyCapital} ETH`;
  }
}

function renderCharts() {
  const lineCanvas = document.getElementById('lineChart');
  const doughnutCanvas = document.getElementById('capitalChart');

  if (lineCanvas) {
    new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'ETH transfers',
            data: DVCAppData.adminStats.weeklyTransactions,
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.18)',
            tension: 0.42,
            fill: true,
          },
          {
            label: 'Active users',
            data: DVCAppData.adminStats.weeklyUsers,
            borderColor: '#34d399',
            backgroundColor: 'rgba(52, 211, 153, 0.12)',
            tension: 0.42,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#e5eefc',
            },
          },
        },
        scales: {
          x: {
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(148, 163, 184, 0.1)' },
          },
          y: {
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(148, 163, 184, 0.1)' },
          },
        },
      },
    });
  }

  if (doughnutCanvas) {
    new Chart(doughnutCanvas, {
      type: 'doughnut',
      data: {
        labels: DVCAppData.startups.map((startup) => startup.name),
        datasets: [
          {
            label: 'Capital by startup',
            data: DVCAppData.adminStats.capitalByStartup,
            backgroundColor: ['#0ea5e9', '#14b8a6', '#22c55e', '#f59e0b', '#fb7185'],
            borderColor: '#09111f',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#e5eefc',
            },
          },
        },
      },
    });
  }
}
