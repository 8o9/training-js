import React, { useState } from 'react';

function ToDoApp() {
  const [todos, setTodos] = useState([]); // 複数なので配列
  const [newTodo, setNewTodo] = useState('');

  // フォーム送信
  const handleSubmit = (e) => {
    e.preventDefault();
    // 空白はダメ
    if (newTodo.trim() === '') return;
    setTodos([{ text: newTodo, completed: false }, ...todos]);
    setNewTodo('');
  };

  // done <-> undone
  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    // 消すもの以外を残す
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="ToDoApp">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">ADD</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <label
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}
              >
                {todo.text}
              </label>
              <button onClick={() => removeTodo(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp;
