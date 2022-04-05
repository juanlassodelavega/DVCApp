// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract InvestmentsContract {

    uint public investmentCounter = 0;

    // constructor () {
    //     createInvestment("Mi primera tarea de ejemplo", "Tengo que hacer algo");
    // }

    event InvestmentCreated(
        uint id,
        string title,
        string amount,
        string time,
        bool done,
        uint createdAt
    );

    event InvestmentToggleDone(uint id, bool done);

    struct Investment {
        uint256 id;
        string title;
        string amount;
        string time;
        bool done;
        uint256 createdAt;
    }

    mapping (uint256 => Investment) public investments;

    function createInvestment(string memory _title, string memory _time, string memory _amount) public {
        investmentCounter++;
        investments[investmentCounter] = Investment(investmentCounter, _title, _amount, _time, true, block.timestamp);
        emit InvestmentCreated(investmentCounter, _title, _amount, _time, true, block.timestamp);
    }

    function toggleDone(uint _id) public {
        Investment memory _investment = investments[_id];
        _investment.done = !_investment.done;
        investments[_id] = _investment;
        emit InvestmentToggleDone(_id, _investment.done);
    }
}
