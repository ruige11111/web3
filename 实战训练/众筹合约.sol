// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract Crowdfunding {
    // 受益人
    address public beneficiary;

    // 筹资目标数量
    uint256 public fundingGoal;

    // 当前募集数量
    uint256 public fundingAmount;

    // 资助者列表
    mapping(address => uint256) public funders;

    // 资助者人数
    uint256 public fundersKey;

    constructor(address _beneficiary, uint256 _fundingGoal) {
        beneficiary = _beneficiary;
        fundingGoal = _fundingGoal;
    }   

    // 资助者向众筹合约捐款
    function fund() public payable {
        require(fundingAmount < fundingGoal, unicode"筹资目标已达到");
        fundingAmount += msg.value;
        funders[msg.sender] += msg.value;
        fundersKey++;
    }
}