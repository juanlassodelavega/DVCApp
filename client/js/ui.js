const investmentForm = document.querySelector("#investmentForm");

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

investmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var startup = document.getElementById("startupsSelect").value;

  if (startup == "") {
    alert("Select a Startup");
  } else {
    // console.log(startup);
    // console.log(investmentForm["amount"].value);
    App.createInvestment(startup, investmentForm["time"].value, investmentForm["amount"].value);
    transaction();
  }
});

// function info() {
//   var startup = document.getElementById("startupsSelect").value;
//   Swal.fire({
//     title: "<h1>" + startup + "</h1>",
//     icon: "info",
//     html: '<p align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem purus, rutrum ut ipsum eget, rhoncus finibus libero. Fusce eleifend varius suscipit. Nullam sit amet commodo ante. raesent vitae luctus mi, at faucibus arcu. </p>',
//     showCloseButton: true,
//     showConfirmButton: false,
//   });
// }

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

// async function test() {
//   var amount = prompt("¿Cuánto quieres retirar?")
//   // var amount = document.getElementById("amount").value*1000000000000000000;
//   var parsedAmount = "0x" + (amount*1000000000000000000).toString(16);
//   await ethereum.request({
//     method: "eth_sendTransaction",
//     params: [
//       {
//         from: "0xCF79BE0d8a782D6C88322Db56A6A54229E29EDc3",
//         to: "0x6445BBc365E12f085F07F2033f90cBd517aBb3eA",
//         value: parsedAmount,
//         gasPrice: "0x09184e72a000",
//         // gas: '0x2710',
//       },
//     ],
//   });
// }

let accounts = [];

async function getAccount() {
  accounts = await ethereum.request({ method: "eth_requestAccounts" });
}
