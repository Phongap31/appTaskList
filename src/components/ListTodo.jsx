import React from "react";
import Todo from "./Todo";

const ListToto = ({
  todos,
  handleRemove,
  changeStatus,
  showForm,
  chooseTodo,
}) => {
  return (
    <>
      <div>
        {todos.map(
          (todo, key) =>
            todo.visible && (
              <Todo
                key={key}
                todo={todo}
                handleRemove={handleRemove}
                changeStatus={changeStatus}
                showForm={showForm}
                chooseTodo={chooseTodo}
              />
            )
        )}
      </div>
    </>
  );
};
export default ListToto;
