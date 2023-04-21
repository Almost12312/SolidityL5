// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Payments {
    struct Payment {
        uint amount;
        uint timestamp;
        uint from;
        uint message;
    }

    struct Balance {
        uint totalPayments;
        mapping(uint => Payment) payments;
    }

mapping(address => Balance) public balances;

    function getPayment()  {
        
    }
}
