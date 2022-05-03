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
    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        App.account = accounts[0]
        var balance = await window.ethereum.request({ method: 'eth_getBalance', params: [App.account, 'latest'] })
        var parsedBalance = balance/1000000000000000000;
        App.balance = parsedBalance
        console.log(App.balance)
    },
    loadContracts: async () => {
        const res = await fetch("InvestmentsContract.json")                       //Traigo el contrato en formato JSON
        const investmentsContractJSON = await res.json()                          //Traigo el contrato en formato JSON
        
        App.contracts.investmentsContract = TruffleContract(investmentsContractJSON)    // Convierto el JSON a Truffle
        App.contracts.investmentsContract.setProvider(App.web3Provider)           // Conectamos con MetaMask
        App.investmentsContract = await App.contracts.investmentsContract.deployed()    // Usamos el contrato desplegado
    },
    render: () => {
        console.log(App.account)
        document.getElementById('account').innerText = App.account
        document.getElementById('balance').innerHTML = App.balance + ' ETH';
    },
    renderInvestments: async () => {
        const investmentCounter = await App.investmentsContract.investmentCounter()
        const investmentCounterNumber = investmentCounter.toNumber()

        let html = '';

        for (let i = 1; i <= investmentCounterNumber; i++) {
            const investment = await App.investmentsContract.investments(i)
            // const investmentId = investment[0]
            const investmentTitle = investment[1]
            // const investmentAmount = investment[2]
            const investmentTime = investment[3]
            // const investmentDone = investment[4]
            const investmentCreated = investment[5]

            let investmentElement = `
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-body rounded mb-2 bg-dark" style="border-radius: 5%; box-shadow: 10px 5px 5px black;">
                            <div class="row">
                                <div class="col-md-12">
                                    <h3> ${investmentTitle} </h3>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-9">
                                    <span> Has hecho una inversión por ${investmentTime} años. </span>
                                    <p class="text-muted">Se creó la transacción ${new Date(investmentCreated * 1000).toLocaleString()}</p>
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
    createInvestment: async (title, time, amount) => {
        const result = await App.investmentsContract.createInvestment(title, time, amount, { 
            from: App.account
        })
        location.reload();
    },
    toggleDone: async (element) => {
        const investmentId = element.dataset.id;

        await App.investmentsContract.toggleDone(investmentId, {
            from: App.account
        })

        location.reload();
    }
}

function showReceipt() {
    window.open('./docs/receipt.pdf', '_blank');
}