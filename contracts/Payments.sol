// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Payments {
    struct Payment {
        uint amount;
        uint timestamp;
        address from;
        string message;
    }

    address private owner;

    event Paid(address indexed _from, uint _amount, uint _timestamp);

    struct Balance {
        uint totalPayments;
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) public balances;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        pay("Hi!");
    }

    function currentBalance() public view returns (uint) {
        return address(this).balance;
    }

    modifier onlyOwner(address _to) {
        require(msg.sender == owner, "You not an owner!");
        require(_to != address(0), "Incorrect address!");

        _;
    }

    function withdrawAll(address payable _to) public onlyOwner(_to) {
        _to.transfer(address(this).balance);
    }

    function getPayment(address _addr, uint _index) public view returns (Payment memory) {
        return balances[_addr].payments[_index];
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function pay(string memory message) public payable {
        emit Paid(msg.sender, msg.value, block.timestamp);

        uint paymentNum = balances[msg.sender].totalPayments;
        balances[msg.sender].totalPayments++;

        Payment memory newPayment = Payment(
            msg.value,
            block.timestamp,
            msg.sender,
            message
        );

        balances[msg.sender].payments[paymentNum] = newPayment;
    }
}
