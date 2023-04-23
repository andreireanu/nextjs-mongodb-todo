const addTodo = async (newTodoTitle, setNewTodoTitle, setAllTodos, allTodos) => {
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

export { addTodo }