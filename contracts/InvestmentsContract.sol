// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract InvestmentsContract {
    uint256 public investmentCounter;

    event InvestmentCreated(
        uint256 id,
        string startup,
        uint256 amountWei,
        string duration,
        bool completed,
        uint256 createdAt
    );

    event InvestmentToggled(uint256 id, bool completed);

    struct Investment {
        uint256 id;
        string startup;
        uint256 amountWei;
        string duration;
        bool completed;
        uint256 createdAt;
    }

    mapping (uint256 => Investment) public investments;

    function createInvestment(string memory _startup, string memory _duration) public payable {
        require(bytes(_startup).length > 0, "Startup name is required");
        require(bytes(_duration).length > 0, "Investment duration is required");
        require(msg.value > 0, "Investment amount is required");

        investmentCounter++;
        investments[investmentCounter] = Investment(
            investmentCounter,
            _startup,
            msg.value,
            _duration,
            false,
            block.timestamp
        );

        emit InvestmentCreated(investmentCounter, _startup, msg.value, _duration, false, block.timestamp);
    }

    function toggleDone(uint256 _id) public {
        Investment storage investment = investments[_id];
        require(investment.id != 0, "Investment not found");

        investment.completed = !investment.completed;
        emit InvestmentToggled(_id, investment.completed);
    }
}
