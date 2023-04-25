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
        console.log("State change failed!");
    }
};

const deleteTodo = async (todoToDelete, setAllTodos) => {
    const result = await fetch("/api/todos/" + todoToDelete._id, {
        method: "DELETE",
    });
    if (result.status == 200) {
        setAllTodos((state) =>
            state.filter((todo) => todo._id !== todoToDelete._id)
        );
    } else {
        console.log("State change failed!");
    }
};


export { addTodo, completeTodo, deleteTodo }