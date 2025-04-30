// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IDO is ERC20 {

    address public erc20;

    constructor(address _erc20) ERC20("IDO", "IDOH") {
        erc20 = _erc20;
    }

    function buyIDOToken(uint num) public {
        erc20Addr.transfer(address(this), num);

        _mint(msg.sender, num);
    }
}