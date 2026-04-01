const InvestmentsContract = artifacts.require("InvestmentsContract");

contract("InvestmentsContract", () => {
    before(async () => {
        this.investmentsContract = await InvestmentsContract.deployed();
    });

    it('deploys successfully', async () => {
        const address = this.investmentsContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, '0x0000000000000000000000000000000000000000');
        assert.notEqual(address, '');
    });

    it('creates investments with an open status', async () => {
        const result = await this.investmentsContract.createInvestment(
            'Heura Foods',
            '24 months',
            '10'
        );
        const investmentEvent = result.logs[0].args;
        const investmentCounter = await this.investmentsContract.investmentCounter();
        const investment = await this.investmentsContract.investments(1);

        assert.equal(investmentCounter.toNumber(), 1);
        assert.equal(investment.id.toNumber(), 1);
        assert.equal(investment.startup, 'Heura Foods');
        assert.equal(investment.amount, '10');
        assert.equal(investment.duration, '24 months');
        assert.equal(investment.completed, false);
        assert.equal(investmentEvent.id.toNumber(), 1);
        assert.equal(investmentEvent.startup, 'Heura Foods');
        assert.equal(investmentEvent.amount, '10');
        assert.equal(investmentEvent.duration, '24 months');
        assert.equal(investmentEvent.completed, false);
    });

    it('toggles investment status', async () => {
        const result = await this.investmentsContract.toggleDone(1);
        const investmentEvent = result.logs[0].args;
        const investment = await this.investmentsContract.investments(1);

        assert.equal(investment.completed, true);
        assert.equal(investmentEvent.completed, true);
        assert.equal(investmentEvent.id, 1);
    });
});
