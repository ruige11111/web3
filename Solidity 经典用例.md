
### **Hello World**

**Hello World**

`pragma` specifies the compiler version of Solidity.

```
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.24 and less than 0.9.0
pragma solidity >=0.8.24 <0.9.0

contract HelloWorld {
    string public greet = "Hello World!";
}
```

### **First App**

**First Application**

Here is a simple contract that you can get, increment and decrement the count store in this contract.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;

    // Function to get the current count
    function get() {
        return count;
    }

    // Function to increment count by 1
    function increment() {
        count++;
    }

    // Function to decrement count by 1
    function decrement() {
        count--;
    }
}
```

### **Primitive Data Types**

Here we introduce you to some primitive data types available in Solidity.

- `boolean`
- `uint256`
- `int256`
- `address`

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Primitives {
    bool public boo = true;

    /*
    uint stands for unsigned integer, meaning non negative integers
    different sizes are available
        uint8   ranges from 0 to 2 ** 8 - 1
        uint16  ranges from 0 to 2 ** 16 - 1
        ...
        uint256 ranges from 0 to 2 ** 256 - 1
    */
    uint8 a = 1;

    /*
    Negative numbers are allowed for int types.
    Like uint, different ranges are available from int8 to int256
    
    int256 ranges from -2 ** 255 to 2 ** 255 - 1
    int128 ranges from -2 ** 127 to 2 ** 127 - 1
    */
    int8 b = -1;

    // minimum and maximum of int


    /*
    In Solidity, the data type byte represent a sequence of bytes. 
    Solidity presents two type of bytes types :

     - fixed-sized byte arrays
     - dynamically-sized byte arrays.
     
     The term bytes in Solidity represents a dynamic array of bytes. 
     It’s a shorthand for byte[] .
    */
    bytes c = "c";

    // Default values
    // Unassigned variables have a default value
    int d;
}
```

### **Variables**

There are 3 types of variables in Solidity

- **local**

  - declared inside a function
  - not stored on the blockchain
- **state**

  - declared outside a function
  - stored on the blockchain
- **global** (provides information about the blockchain)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Variables {
    // State variables are stored on the blockchain.
    int a = 1;

    function doSomething() public {
        // Local variables are not saved to the blockchain.
        int b = 2;

        // Here are some global variables
        address sender = msg.sender;
    }
}
```

### **Constants**

Constants are variables that cannot be modified.

Their value is hard coded and using constants can save gas cost.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Constants {
    // coding convention to uppercase constant variables
    int constant a = 1;
}
```

### **Immutable**

Immutable variables are like constants. Values of immutable variables can be set inside the constructor but cannot be modified afterwards.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Immutable {
    // coding convention to uppercase constant variables
    int immutable a;
    constructor(int _a) {
        a = _a;
    }
}
```

### **Reading and Writing to a State Variable**

To write or update a state variable you need to send a transaction.

On the other hand, you can read state variables, for free, without any transaction fee.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleStorage {
    // State variable to store a number
    int a = 1;

    // You need to send a transaction to write to a state variable.
    function set() {
        a = 2;
    }

    // You can read from a state variable without sending a transaction.
    function get() {
        return a;
    }
}
```

### **Ether and Wei**

Transactions are paid with `ether`.

Similar to how one dollar is equal to 100 cent, one `ether` is equal to 10(18) `wei`.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EtherUnits {
    uint256 public oneWei = 1 wei;
    // 1 wei is equal to 1
    

    // 1 gwei is equal to 10^9 gwei

    // 1 ether is equal to 10^18 wei
}
```

### **Gas**

### **How much ****ether**** do you need to pay for a transaction?**

You pay `gas spent * gas price` amount of `ether`, where

- `gas` is a unit of computation
- `gas spent` is the total amount of `gas` used in a transaction
- `gas price` is how much `ether` you are willing to pay per `gas`

Transactions with higher gas price have higher priority to be included in a block.

Unspent gas will be refunded.

### **Gas Limit**

There are 2 upper bounds to the amount of gas you can spend

- `gas limit` (max amount of gas you're willing to use for your transaction, set by you)
- `block gas limit` (max amount of gas allowed in a block, set by the network)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Gas {
    uint256 public i = 0;

    // Using up all of the gas that you send causes your transaction to fail.
    // State changes are undone.
    // Gas spent are not refunded.
    function a() {
        while(true) {
            i++;
        }
    }
}
```

### **If / Else**

Solidity supports conditional statements `if`, `else if` and `else`.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IfElse {
    function foo(uint256 x) public pure returns (uint256) {
        if (x < 10) {
            return 0;
        } else if (x < 20) {
            return 1;
        } else {
            return 2;
        }
    }

    function ternary(uint256 _x) public pure returns (uint256) {
        // if (_x < 10) {
        //     return 1;
        // }
        // return 2;

        // shorthand way to write if / else statement
        // the "?" operator is called the ternary operator
        return _x < 10 ? 1 : 2;
    }
}
```

### **For and While Loop**

Solidity supports `for`, `while`, and `do while` loops.

Don't write loops that are unbounded as this can hit the gas limit, causing your transaction to fail.

For the reason above, `while` and `do while` loops are rarely used.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Loop {
    function loop() public {
        // for loop
        for (int a = 1; a < 10; a++) {

        }

        // while loop
        int b = 1;
        while(b < 10) {

        }
        
    }
}
```

### **Mapping**

Maps are created with the syntax `mapping(keyType => valueType)`.

The `keyType` can be any built-in value type, bytes, string, or any contract.

`valueType` can be any type including another mapping or an array.

Mappings are not iterable.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Mapping {
    // Mapping from address to uint
    mapping(address=>uint) a;

    function get(address _addr) public view returns (uint256) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return a[_addr];
    }

    function set(address _addr, uint256 _i) public {
        // Update the value at this address
        a[_addr] = i;
    }

    function remove(address _addr) public {
        // Reset the value to the default value.
        delete a[_addr];
    }
}

contract NestedMapping {
    // Nested mapping (mapping from address to another mapping)
    mapping(address=>mapping) a;

    function get(address _addr1, uint256 _i) public view returns (bool) {
        // You can get values from a nested mapping
        // even when it is not initialized
        return a[_addr];
    }

    function set(address _addr1, uint256 _i, bool _boo) public {
    }

    function remove(address _addr1, uint256 _i) public {
    }
}
```

### **Array**

Array can have a compile-time fixed size or a dynamic size.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Array {
    // Several ways to initialize an array
    int[] a;
    int[10] b;
    // Fixed sized array, all elements initialize to 0
    int[10] c;

    function get(uint256 i) public view returns (uint256) {
        return arr[i];
    }

    // Solidity can return the entire array.
    // But this function should be avoided for
    // arrays that can grow indefinitely in length.
    function re() {
        return a;
    }
    

    function push(uint256 i) public {
        // Append to array
        // This will increase the array length by 1.
        a.push(1);
    }

    function pop() public {
        // Remove last element from array
        // This will decrease the array length by 1
        a.pop();
    }

    function getLength() public view returns (uint256) {
    }

    function remove(uint256 index) public {
        // Delete does not change the array length.
        // It resets the value at index to it's default value,
        // in this case 0
        delete a[index];
    }

    function examples() external {
        // create array in memory, only fixed size can be created
        int[10] d;
    }
}
```

### **Examples of removing array element**

Remove array element by shifting elements from right to left

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ArrayRemoveByShifting {
    // [1, 2, 3] -- remove(1) --> [1, 3, 3] --> [1, 3]
    // [1, 2, 3, 4, 5, 6] -- remove(2) --> [1, 2, 4, 5, 6, 6] --> [1, 2, 4, 5, 6]
    // [1, 2, 3, 4, 5, 6] -- remove(0) --> [2, 3, 4, 5, 6, 6] --> [2, 3, 4, 5, 6]
    // [1] -- remove(0) --> [1] --> []

    
}
```

Remove array element by copying last element into to the place to remove

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ArrayReplaceFromEnd {
    uint256[] public arr;

    // Deleting an element creates a gap in the array.
    // One trick to keep the array compact is to
    // move the last element into the place to delete.
    
}
```

### **Enum**

Solidity supports enumerables and they are useful to model choice and keep track of state.

Enums can be declared outside of a contract.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Enum {
    // Enum representing shipping status
    enum a = {
        A,
        B
    };

    // Default value is the first element listed in
    // definition of the type, in this case "Pending"


    // Returns uint
    // Pending  - 0
    // Shipped  - 1
    // Accepted - 2
    // Rejected - 3
    // Canceled - 4
    

    // Update status by passing uint into input

    // You can update to a specific enum like this
    

    // delete resets the enum to its first value, 0
    
    
}
```

### **Structs**

You can define your own type by creating a `struct`.

They are useful for grouping together related data.

Structs can be declared outside of a contract and imported in another contract.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Todos {
    struct Todo {
        string text;
        bool completed;
    }

    // An array of 'Todo' structs

    function create(string calldata _text) public {
        // 3 ways to initialize a struct
        // - calling it like a function
        Todo todo = Todo("a", true);

        // key value mapping
        Todo todo = Todo({text: "a", completed: true});
        

        // initialize an empty struct and then update it
        Todo todo = Todo();
        todo.text = "a";

        // todo.completed initialized to false
        todo.completed = false;
    }

    // Solidity automatically created a getter for 'todos' so
    // you don't actually need this function.

    // update text
    function update(string text) {
        todo.text = text;
    }

    // update completed
    function update(string completed) {
        todo.completed = completed;
    }
}
```

**Declaring and importing Struct**

File that the struct is declared in

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
// This is saved 'StructDeclaration.sol'


```

File that imports the struct above

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./StructDeclaration.sol";

contract Todos {
    // An array of 'Todo' structs
    Todo[] todo;
}
```

### **Data Locations**

### **Data Locations - Storage, Memory and Calldata**

Variables are declared as either `storage`, `memory` or `calldata` to explicitly specify the location of the data.

- `storage` variable is a state variable (store on blockchain)
- `memory` variable is in memory and it exists while a function is being called
- `calldata` special data location that contains function arguments

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DataLocations {
    uint256[] public arr;
    mapping(uint256 => address) map;

    struct MyStruct {
        uint256 foo;
    }

    mapping(uint256 => MyStruct) myStructs;

    function f() public {
        // call _f with state variables

        // get a struct from a mapping

        // create a struct in memory
        MyStruct memory myStruct;
    }

    function _f(
        uint256[] storage _arr,
        mapping(uint256 => address) storage _map,
        MyStruct storage _myStruct
    ) internal {
        // do something with storage variables
    }

    // You can return memory variables
    function g(uint256[] memory _arr) public returns (uint256[] memory) {
        // do something with memory array
    }

    function h(uint256[] calldata _arr) external {
        // do something with calldata array
    }
}
```

### **Transient Storage**

Data stored in transient storage is cleared out after transaction.

```
pragma solidity ^0.8.24;

// Make sure EVM version and VM set to Cancun

// Storage - data is stored on the blockchain
// Memory - data is cleared out after a function call
// Transient storage - data is cleared out after a transaction

contract A {
    function a() {
        int b = 1;
    }
}
```

### **Function**

There are several ways to return outputs from a function.

Public functions cannot accept certain data types as inputs or outputs

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Function {
    // Functions can return multiple values.
    function a() {
        return (1, 2);
    }

    // Return values can be named.
    

    // Return values can be assigned to their name.
    // In this case the return statement can be omitted.
    

    // Use destructuring assignment when calling another
    // function that returns multiple values.
    function destructuringAssignments()
        public
        pure
        returns (uint256, bool, uint256, uint256, uint256)
    {
        (uint256 i, bool b, uint256 j) = returnMany();

        // Values can be left out.


        return (i, b, j, x, y);
    }

    // Cannot use map for either input or output

    // Can use array for input
    function a(int[] b) {}

    // Can use array for output
    function a() {
        return [1,2];
    }

    function arrayOutput() public view returns (uint256[] memory) {
        return arr;
    }
}

// Call function with key-value inputs
contract XYZ {
    function a({int b, int c}) {}
}
```

### **View and Pure Functions**

Getter functions can be declared `view` or `pure`.

`View` function declares that no state will be changed.

`Pure` function declares that no state variable will be changed or read.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ViewAndPure {
    uint256 public x = 1;

    // Promise not to modify the state.
    function a() view {
        return x;
    }

    // Promise not to modify or read from the state.
    function b() pure {

    }
}
```

### **Error**

An error will undo all changes made to the state during a transaction.

You can throw an error by calling `require`, `revert` or `assert`.

- `require` is used to validate inputs and conditions before execution.
- `revert` is similar to `require`. See the code below for details.
- `assert` is used to check for code that should never be false. Failing assertion probably means that there is a bug.

Use custom error to save gas.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Error {
    function testRequire(uint256 _i) public pure {
        // Require should be used to validate conditions such as:
        // - inputs
        // - conditions before execution
        // - return values from calls to other functions
        require(_i > 0);
    }

    function testRevert(uint256 _i) public pure {
        // Revert is useful when the condition to check is complex.
        // This code does the exact same thing as the example above
        if (_i > 0) {
           revert(); 
        }
    }

    uint256 public num;

    function testAssert() public view {
        // Assert should only be used to test for internal errors,
        // and to check invariants.

        // Here we assert that num is always equal to 0
        // since it is impossible to update the value of num
        assert(num == 0);
    }

    // custom error
    error A();
    function a() {
           revert(A); 
    }
}
```

Here is another example

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Account {
    uint256 public balance;
    uint256 public constant MAX_UINT = 2 ** 256 - 1;

    function deposit(uint256 _amount) public {
        uint256 oldBalance = balance;
        uint256 newBalance = balance + _amount;

        // balance + _amount does not overflow if balance + _amount >= balance
        assert(balance + _amount >= balance);

        balance = newBalance;

        assert(balance >= oldBalance);
    }

    function withdraw(uint256 _amount) public {
        uint256 oldBalance = balance;

        // balance - _amount does not underflow if balance >= _amount

        if (balance < _amount) {
            revert("Underflow");
        }

        balance -= _amount;

        assert(balance <= oldBalance);
    }
}
```

### **Function Modifier**

Modifiers are code that can be run before and / or after a function call.

Modifiers can be used to:

- Restrict access
- Validate inputs
- Guard against reentrancy hack

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FunctionModifier {
    // We will use these variables to demonstrate how to use
    // modifiers.
    address public owner;
    uint256 public x = 10;
    bool public locked;

    constructor() {
        // Set the transaction sender as the owner of the contract.
        owner = msg.sender;
    }

    // Modifier to check that the caller is the owner of
    // the contract.
    modifier a() {
        assert(owner == msg.sender)
    }

    // Modifiers can take inputs. This modifier checks that the
    // address passed in is not the zero address.
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    function changeOwner(address _newOwner)
        public
        onlyOwner
        validAddress(_newOwner)
    {
        owner = _newOwner;
    }

    // Modifiers can be called before and / or after a function.
    // This modifier prevents a function from being called while
    // it is still executing.
    function b() a {

    }

    function decrement(uint256 i) public noReentrancy {
        x -= i;

        if (i > 1) {
            decrement(i - 1);
        }
    }
}
```

### **Events**

`Events` allow logging to the Ethereum blockchain. Some use cases for events are:

- Listening for events and updating user interface
- A cheap form of storage

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Event {
    // Event declaration
    // Up to 3 parameters can be indexed.
    // Indexed parameters helps you filter the logs by the indexed parameter
    event a(int b);

    function test() public {
        emit Log(msg.sender, "Hello World!");
        emit Log(msg.sender, "Hello EVM!");
        emit AnotherLog();
    }
}
```

### **Constructor**

A `constructor` is an optional function that is executed upon contract creation.

Here are examples of how to pass arguments to `constructors`.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Base contract X
contract X {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }
}

// Base contract Y
contract Y {
    string public text;

    constructor(string memory _text) {
        text = _text;
    }
}

// There are 2 ways to initialize parent contract with parameters.

// Pass the parameters here in the inheritance list.
contract B is X("Input to X"), Y("Input to Y") {}

contract C is X, Y {
    // Pass the parameters here in the constructor,
    // similar to function modifiers.
    constructor() {

    }
}

// Parent constructors are always called in the order of inheritance
// regardless of the order of parent contracts listed in the
// constructor of the child contract.

// Order of constructors called:
// 1. X
// 2. Y
// 3. D


// Order of constructors called:
// 1. X
// 2. Y
// 3. E

```