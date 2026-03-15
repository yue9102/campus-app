import React from 'react'
import './TodoList.css'

const TodoList = ({ count, onGoToDraw }) => {
  return (
    <div className="todo-list-container">
      <button 
        className="todo-list-button"
        onClick={onGoToDraw}
        disabled={count === 0}
      >
        <span className="todo-count">待选: {count}</span>
        {count > 0 && <span className="todo-arrow">→</span>}
      </button>
    </div>
  )
}

export default TodoList