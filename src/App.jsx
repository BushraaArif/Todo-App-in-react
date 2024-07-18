import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import "./style.css";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleUpdateTodo = (id, text) => {
    const updatedText = prompt("Update to-do:", text);
    if (updatedText) {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: updatedText } : todo)));
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>My App</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1>To-Do List</h1>
              <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add new to-do" />
              <button onClick={handleAddTodo}>Add</button>
              <ul>
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <input type="checkbox" checked={todo.completed} onChange={() => handleToggleCompleted(todo.id)} />
                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                    <button onClick={() => handleUpdateTodo(todo.id, todo.text)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      <AiFillDelete />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          } />
          <Route path="/about" element={<About description="This is my About Us page. You can find information here." />} />
          <Route path="/contact" element={<Contact description="This is the Contact Us page." />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
