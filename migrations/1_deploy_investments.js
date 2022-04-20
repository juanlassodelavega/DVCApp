const InvestmentsContract = artifacts.require("InvestmentsContract");

module.exports = function (deployer) {
  deployer.deploy(InvestmentsContract);
};
