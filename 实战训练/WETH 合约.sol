import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("Wrapped Ether", "WETH") {
        _mint(msg.sender, 1000000000000000000000000);
    }

    // 查询指定地址的 Token 数量
    function balanceOf(address account) public view returns (uint256) {
        return super.balanceOf(account);
    }

    // 查询当前合约的 Token 总量
    function totalSupply() public view returns (uint256) {
        return super.totalSupply();
    }

    // 查询指定地址对另外一个地址的剩余授权额度
    function allowance(address owner, address spender) public view returns (uint256) {
        return super.allowance(owner, spender);
    }

    // 从当前调用者地址发送指定数量的 Token 到指定地址（这是一个写入方法，所以还会抛出一个 Transfer 事件）
    function transfer(address to, uint256 amount) public returns (bool) {
        emit Transfer(msg.sender, to, amount);
        return super.transfer(to, amount);
    }

    // 当向另外一个合约地址存款时，对方合约必须调用 transferFrom 才可以把 Token 拿到它自己的合约中
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        return super.transferFrom(from, to, amount);
    }

    // 事件Transfer
    event Transfer(address indexed from, address indexed to, uint256 value);

    // 事件Approval
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // 授权指定地址可以操作调用者的最大 Token 数量
    function approve(address spender, uint256 amount) public returns (bool) {
        emit Approval(msg.sender, spender, amount);
        return super.approve(spender, amount);
    }
    
    
}