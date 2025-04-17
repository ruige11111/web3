import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SavingPot is IERC20, IERC721 {
    // 此合约支持主币以外的资产ERC20、ERC721
    constructor() {
    }

    // 代币转账
    function sendERC20(address token, address to, uint256 amount) external {
        IERC20(token).transfer(to, amount);
    }

    function sendERC721(address token, address to, uint256 tokenId) external {
        IERC721(token).transferFrom(msg.sender, to, tokenId);
    }

    // 所有人都可以存钱（以太币）
    receive() external payable {}

    // 只要取钱，合约就销毁
    function withdraw() external {
        selfdestruct(payable(msg.sender));
    }
}