// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// Deifinimos el contrato con todas sus funcionalidades
contract InvestmentsContract {

    // Inicializamos el contador a 0
    uint public investmentCounter = 0;

    // Alamcenamos los argumentos para el contrato
    event InvestmentCreated(
        uint id,
        string title,
        string amount,
        string time,
        bool done,
        uint createdAt
    );

    // Almacenamos los argumentos para ToggleDone
    event InvestmentToggleDone(uint id, bool done);

    // Creamos un tipo de dato con su respectiva estructura
    struct Investment {
        uint256 id;
        string title;
        string amount;
        string time;
        bool done;
        uint256 createdAt;
    }

    // Creamos un "diccionario" con la información de la inversión
    mapping (uint256 => Investment) public investments;

    // Funcion que permite crear una inversión en la blockchain
    function createInvestment(string memory _title, string memory _time, string memory _amount) public {
        investmentCounter++;
        investments[investmentCounter] = Investment(investmentCounter, _title, _amount, _time, true, block.timestamp);
        emit InvestmentCreated(investmentCounter, _title, _amount, _time, true, block.timestamp);
    }

    // Funcion que permite marcar como completado en la blockchain (no implementado)
    function toggleDone(uint _id) public {
        Investment memory _investment = investments[_id];
        _investment.done = !_investment.done;
        investments[_id] = _investment;
        emit InvestmentToggleDone(_id, _investment.done);
    }
}
