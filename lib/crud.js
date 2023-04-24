const addTodo = async (newTodoTitle, setNewTodoTitle, setAllTodos) => {
    const result = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ newTodoTitle }),
    });
    if (result.status == 200) {
        const newData = await result.json();
        setNewTodoTitle('');
        setAllTodos(prevData => [...prevData, newData]);
    }
};

const completeTodo = async ({ _id, completed }, setAllTodos, allTodos) => {
    const result = await fetch("/api/todos/" + _id, {
        method: "PATCH",
        body: JSON.stringify({ _id, completed: !completed })
    });
    if (result.status == 200) {
        let newTodos = allTodos;
        newTodos.map(todo => {
            if (todo._id === _id) {
                todo.completed = !completed;
            }
        });
        setAllTodos(_ => [...newTodos]);
    } else {
        console.log("Complete state change failed!");
    }
}

export { addTodo, completeTodo }