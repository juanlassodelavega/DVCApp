App = {
    contracts: {},
    init: async () => {
        console.log('Loaded')
        await App.loadEthereum()
        await App.loadAccount()
        await App.loadContracts()
        App.render()
        await App.renderInvestments()
    },
    // Comprueba si es un navegador Ethereum
    loadEthereum: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log('No ethereum browser is installed. Try it installing Metamask')
        }
    },
    // Carga todas las wallets conectadas al navegador
    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        App.account = accounts[0]   // Almacenamos la cuenta
        var balance = await window.ethereum.request({ method: 'eth_getBalance', params: [App.account, 'latest'] })
        var parsedBalance = balance/1000000000000000000;
        App.balance = parsedBalance // Almacenamos el balance de la cuenta
        console.log(App.balance)
    },
    // Permite cargar todos los contratos almacenados en la blockchain
    loadContracts: async () => {
        const res = await fetch("InvestmentsContract.json")                       //Traigo el contrato en formato JSON
        const investmentsContractJSON = await res.json()                          //Traigo el contrato en formato JSON
        
        App.contracts.investmentsContract = TruffleContract(investmentsContractJSON)    // Convierto el JSON a Truffle
        App.contracts.investmentsContract.setProvider(App.web3Provider)                 // Conectamos con MetaMask
        App.investmentsContract = await App.contracts.investmentsContract.deployed()    // Usamos el contrato desplegado
    },
    // Muestra al usuario su cuenta y su balance
    render: () => {
        console.log(App.account)
        document.getElementById('account').innerText = App.account
        document.getElementById('balance').innerHTML = App.balance + ' ETH';
    },
    // Muestra al usuario todas las inversiones que ha realizado
    renderInvestments: async () => {
        const investmentCounter = await App.investmentsContract.investmentCounter()
        const investmentCounterNumber = investmentCounter.toNumber()

        let html = '';

        for (let i = 1; i <= investmentCounterNumber; i++) {
            const investment = await App.investmentsContract.investments(i)
            // const investmentId = investment[0]
            const investmentTitle = investment[1]
            const investmentAmount = investment[2]
            const investmentTime = investment[3]
            // const investmentDone = investment[4]
            const investmentCreated = investment[5]

            let investmentElement = `
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-body rounded mb-2 bg-dark" style="border-radius: 5%; box-shadow: 10px 5px 5px black;">
                            <div class="row">
                                <div class="col-md-10">
                                    <h3 id="investmentTitle"> ${investmentTitle} </h3>
                                </div>
                                <div class="col-md-2">
                                    <span style="font-weight: bold; float: right;"> Inversión: </span>
                                    <br>
                                    <span id="investmentAmount" style="font-weight:lighter; float: right;"> ${investmentAmount} ETH </span>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-9">
                                    <span id="info"> Has hecho una inversión por ${investmentTime} años. </span>
                                    <p id="date" class="text-muted">Se creó la transacción ${new Date(investmentCreated * 1000).toLocaleString()}</p>
                                </div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-info" style="float:right" onclick="showReceipt()"> Ver transacción </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `

            html += investmentElement;
        }

        document.querySelector('#investmentsList').innerHTML = html;
    },
    // Permite crear una inversión, llamando al Smart Contract
    createInvestment: async (title, time, amount) => {
        const result = await App.investmentsContract.createInvestment(title, time, amount, { 
            from: App.account
        })
        location.reload();
    },
    // Permite marcar como completada una inversión (no implementado)
    toggleDone: async (element) => {
        const investmentId = element.dataset.id;

        await App.investmentsContract.toggleDone(investmentId, {
            from: App.account
        })

        location.reload();
    }
}

// Permite mostrar al usuario el recibo de la transacción (no implementado por completo)
function showReceipt() {
    window.open('./docs/receipt.pdf', '_blank');
    // var title = document.getElementById('title').innerText;
    // var investmentTitle = document.getElementById("investmentTitle").innerHTML;
    // var investmentAmount = document.getElementById("investmentAmount").innerHTML;
    // var info = document.getElementById("info").innerHTML;
    // var date = document.getElementById("date").innerHTML;
    
    // const doc = new jsPDF();
    // doc.text(title, 10, 10);
    // doc.text(investmentTitle, 10, 30)
    // doc.text(investmentAmount, 40, 30)
    // doc.text(info, 20, 40)
    // doc.text(date, 20, 50)
    // doc.save("receipt.pdf");
}