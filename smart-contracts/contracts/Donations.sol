// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donations {
    address public admin;
    uint public totalDonations;

    struct Donor {
        address donorAddress;
        uint amount;
    }

    Donor[] public donors;
    mapping(address => uint) public donorAmounts;

    event DonationReceived(address indexed donor, uint amount);
    event FundsWithdrawn(address indexed admin, uint amount);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        if (donorAmounts[msg.sender] == 0) {
            donors.push(Donor(msg.sender, msg.value));
        } else {
            for (uint i = 0; i < donors.length; i++) {
                if (donors[i].donorAddress == msg.sender) {
                    donors[i].amount += msg.value;
                }
            }
        }

        donorAmounts[msg.sender] += msg.value;
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }

    function getTotalDonations() public view returns (uint) {
        return totalDonations;
    }

    function withdraw(uint _amount) public onlyAdmin {
        require(_amount <= address(this).balance, "Insufficient balance");
        payable(admin).transfer(_amount);
        emit FundsWithdrawn(admin, _amount);
    }

    function getDonors() public view returns (Donor[] memory) {
        return donors;
    }
}

