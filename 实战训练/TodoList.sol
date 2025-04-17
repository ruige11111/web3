contract TodoList {
    struct Todo {
        string content;
        bool completed;
    }
    // 使用数组 index 作为任务 ID。则数据的元素内需要记录任务名称，任务完成状态
    Todo[] public todos;

    // 添加任务
    function addTodo(string memory content) public {
        todos.push(Todo(content, false));
    }

    // 修改任务
    function updateTodo(uint256 index, string memory content) public {
        todos[index].content = content;
    }
    
    // 修改完成状态
    function toggleCompleted(uint256 index) public {
        todos[index].completed = !todos[index].completed;
    }

    // 删除任务
    
}