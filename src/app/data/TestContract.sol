// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BalanceContract {
    mapping(address => uint256) public balances;

    event Deposit(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amount);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
        balances[msg.sender] -= amount;
        emit Withdrawal(msg.sender, amount);
    }

    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }
}
