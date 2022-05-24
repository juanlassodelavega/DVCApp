const investmentForm = document.querySelector("#investmentForm");

// Inicializamos las funciones contenidas en app.js
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

investmentForm.addEventListener("submit", (e) => {
  // Cancela el evento si es cancelable
  e.preventDefault();

  var startup = document.getElementById("startupsSelect").value;

  // Comprobamos que se ha seleccionado una startup
  if (startup == "") {
    alert("Seleccione una Startup");
  } else {
    // Se crea una inversión con los datos del formulario
    App.createInvestment(startup, investmentForm["time"].value, investmentForm["amount"].value);
    transaction();
  }
});

// Obtenemos todas las wallets al cargar la página
window.onload = function () {
  getAccount();
};

// Funcion que permite realizar una transacción
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

// Almacenamos las wallets en un array
let accounts = [];

// Permite obtener las cuentas
async function getAccount() {
  accounts = await ethereum.request({ method: "eth_requestAccounts" });
}
