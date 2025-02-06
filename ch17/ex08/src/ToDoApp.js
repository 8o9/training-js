import React, { useState } from 'react';
import 'uikit/dist/css/uikit.min.css';

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
    <div className="uk-container uk-margin-to">
      <form onSubmit={handleSubmit} className="uk-form-stacked uk-margin-bottom uk-flex">
        <fieldset class="uk-fieldset">
        <legend class="uk-legend">TODO</legend>
        <div class="uk-margin uk-flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="uk-input"
        />
        <button type="submit" className="uk-button uk-button-primary">ADD</button>
        </div>
        </fieldset>
      </form>
      <ul className="uk-list uk-list-divider">
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="uk-flex uk-flex-middle">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="uk-checkbox uk-margin-small-right"
              />
              <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </label>
              <button
                onClick={() => removeTodo(index)}
                className="uk-button uk-button-danger uk-button-small uk-margin-left"
                style={{ backgroundColor: '#dc3545', color: '#fff' }}
              >X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp;
