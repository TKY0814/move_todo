import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoList from './TodoList';
import './App.css';


const initialTodos = [
  { id: 1, text: 'Reactを学ぶ' },
  { id: 2, text: 'Reduxを学ぶ' },
  { id: 3, text: 'Learn React DnD' },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleMove = (dragIndex, hoverIndex) => {
    const newTodos = [...todos];
    const dragTodo = newTodos[dragIndex];
    newTodos.splice(dragIndex, 1);
    newTodos.splice(hoverIndex, 0, dragTodo);

    setTodos(newTodos);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        text: inputValue.trim(),
      };
      setTodos([...todos, newTask]);
      setInputValue('');
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>並び替えれるTodoアプリ
        </h1>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="新規入力"
            style={{ marginRight: '10px', width: '75%'}}
          />
          <button onClick={handleAddTask} style={{ width: '20%' }}>
            追加
          </button>
        </div>
        <TodoList todos={todos} onMove={handleMove} onDelete={handleDelete} />
      </div>
    </DndProvider>
  );
}
export default App;