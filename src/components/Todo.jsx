import React, {useRef} from "react";
import "./todos.css";

const Todo = ({ todo, handleRemove, changeStatus, chooseTodo }) => {
  const removeTodo = (e) => {
    e.preventDefault();
    handleRemove(todo.id);
  };

  const detailTodo = (e) => {
    e.preventDefault();
    chooseTodo(todo.id);
  };
  return (
    <div className="todo-n">
      <div id = 'left'>
        <input className ='checkbox' type="checkbox" />
        {todo.title}
        <br/>
        {todo.date}
      </div>
      <div id ='right'>
        <button className="detail" onClick={detailTodo}>
          Detail
        </button>
        <button className="remove" onClick={removeTodo}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default Todo;
