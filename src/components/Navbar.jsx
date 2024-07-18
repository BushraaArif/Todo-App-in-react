import React, { useState, useEffect } from "react";

function ToDoApp() {
  const [todos, setTodos] = useState([]); // Array to store todo items
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [newTodo, setNewTodo] = useState(""); // State for adding new todo

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage on changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Update storage only when todos change

  const handleAddTodo = () => {
    if (newTodo.trim()) { // Ensure newTodo has content
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo(""); // Clear input after adding
    }
  };

  const handleUpdateTodo = (id, updatedText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: updatedText } : todo))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleMarkCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Convert search to lowercase
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="todo-app">
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Search Todos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="todo-form">
        <input
          type="text"
          placeholder="Add a to-do..."
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              onClick={() => handleMarkCompleted(todo.id)}
            >
              {todo.text}
            </span>
            <div className="todo-actions">
              <button onClick={() => handleUpdateTodo(todo.id, prompt("Update Todo:") || todo.text)}>
                Update
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp;
