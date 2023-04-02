import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
function TodoItem({ todo, index, onMove, onDelete }) {
  const ref = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: 'todo',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'todo',
    item: { id: todo.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{
        // ... (既存のスタイル)
        opacity: isDragging ? 0.5 : 1, // この行を追加
      }}
    >
      {todo.text}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
  削除
</button>
    </li>
  );
}
export default TodoItem;
