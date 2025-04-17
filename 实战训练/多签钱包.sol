contract MultiSigWallet {
    // 钱包所有者
    address[] public owners;

    uint256 public minSigNum;

    constructor(address[] memory _owners, uint256 _minSigNum) {
        owners = _owners;
        minSigNum = _minSigNum;
    }
    
    receive() external payable {}
    
}