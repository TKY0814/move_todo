import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onMove, onDelete }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onMove={onMove}
          onDelete={onDelete} // この行を追加
        />
      ))}
    </ul>
  );
}

export default TodoList;

