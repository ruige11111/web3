contract ETHWallet {
    // 钱包所有者
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    // 任何人都可以发送金额到合约
    receive() external payable {}
    
    // 只有 owner 可以取款
    function withdraw() external {
        require(msg.sender == owner, unicode"只有 owner 可以取款");
        // 3 种取钱方式
        payable(owner).transfer(address(this).balance);
    }
    
    
}