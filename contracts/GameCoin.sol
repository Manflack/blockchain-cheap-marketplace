// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GameCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gamer", "GMC") {
        _mint(msg.sender, initialSupply);
    }
}