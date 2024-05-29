import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoLayout = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://mern-todobackend.vercel.app/api/todo"
        //"http://localhost:3000/api/todo "
      );
      if (response.data && Array.isArray(response.data.todo)) {
        setTodos(response.data.todo);
      } else {
        setTodos([]);
      }
    } catch (error) {
      setError("Error occurred while fetching data");
      console.error("Error occurred", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      return;
    }
    try {
      const response = await axios.post(
        "https://mern-todobackend.vercel.app/api/todo",
        {
          item: newTodo,
        }
      );
      if (response.data && response.data.todo) {
        setTodos([...todos, response.data.todo]);
        setNewTodo("");
      }
    } catch (error) {
      setError("Error occurred while adding todo");
      console.error("Error occurred", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://mern-todobackend.vercel.app/api/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Error occurred while deleting todo");
      console.error("Error occurred", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 mt-10 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <form onSubmit={addTodo} className="flex space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Todo
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm"
          >
            <span>{todo.item}</span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoLayout;
