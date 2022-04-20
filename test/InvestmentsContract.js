const InvestmentsContract = artifacts.require("InvestmentsContract");

contract("InvestmentsContract", () => {

    before(async () => {
        this.investmentsContract = await InvestmentsContract.deployed()
    });

    it('migrate deployed successfully', async () => {
        const address = this.investmentsContract.address
        
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, "")
    });

    it('get Investments list', async () => {
        const investmentsCounter = await this.investmentsContract.investmentCounter()
        const investment = await this.investmentsContract.investments(investmentsCounter)
       
        assert.equal(investment.id.toNumber(), investmentsCounter);
        assert.equal(investment.title, 'Mi primera inversion de ejemplo');
        assert.equal(investment.description, 'He invertido 12 ETH');
        assert.equal(investment.done, false);
        assert.equal(investmentsCounter, 1);  
    });

    it('investment createad successfully', async () => {
        const result = await this.investmentsContract.createInvestment("some investment", "description two")
        const investmentEvent = result.logs[0].args;
        const investmentCounter = await this.investmentsContract.investmentCounter();
        
        assert.equal(investmentCounter, 2);
        assert.equal(investmentEvent.id.toNumber(), 2);
        assert.equal(investmentEvent.title, 'some investment');
        assert.equal(investmentEvent.description, 'description two');
        assert.equal(investmentEvent.done, false);
    });

    it('investment toggle done', async () => {
        const result = await this.investmentsContract.toggleDone(1);
        const investmentEvent = result.logs[0].args;
        const investment = await this.investmentsContract.investments(1);

        assert.equal(investment.done, true);
        assert.equal(investmentEvent.done, true);
        assert.equal(investmentEvent.id, 1);
    });

})