const investmentForm = document.querySelector("#investmentForm");

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

investmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var startup = document.getElementById("startupsSelect").value;

  if (startup == "") {
    alert("Seleccione una Startup");
  } else {
    App.createInvestment(startup, investmentForm["time"].value, investmentForm["amount"].value);
    transaction();
  }
});

window.onload = function () {
  getAccount();
};

async function transaction() {
  var amount = document.getElementById("amount").value*1000000000000000000;
  var parsedAmount = "0x" + amount.toString(16);
  await ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: accounts[0],
        to: "0xCF79BE0d8a782D6C88322Db56A6A54229E29EDc3",
        value: parsedAmount,
        gasPrice: "0x09184e72a000",
        // gas: '0x2710',
      },
    ],
  });
}

let accounts = [];

async function getAccount() {
  accounts = await ethereum.request({ method: "eth_requestAccounts" });
}
