// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    event CoinFlipped(address indexed player, bool won, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool _guess) public payable returns (bool) {
        require(msg.value > 0, "Must bet some ETH");

        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 2;
        bool outcome = random == 1;

        if (_guess == outcome) {
            payable(msg.sender).transfer(msg.value * 2);
            emit CoinFlipped(msg.sender, true, msg.value);
            return true;
        } else {
            emit CoinFlipped(msg.sender, false, msg.value);
            return false;
        }
    }

    function checkContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function checkUserBalance() public view returns (uint256) {
        return msg.sender.balance;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
