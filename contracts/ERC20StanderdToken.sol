// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20StanderdToken is ERC20,Ownable {
    constructor(
        address _owner,
        string memory tokenName,
        string memory tokenSymbol,
        uint256 tokenSuply
    ) ERC20(tokenName, tokenSymbol) {
        _mint(_owner, tokenSuply * (10**uint256(decimals())));
        _transferOwnership(_owner);
    }
}
