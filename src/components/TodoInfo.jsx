import React, { useRef, useEffect } from "react";
import uuid from "uuid/dist/v4";
const TodoInfo = ({ todo = {}, action, onClick, title }) => {
  const refTitle = useRef();
  const refDescription = useRef();
  const refDueDate = useRef();
  const refPiority = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    const _todo = {
      id: todo.id || uuid(),
      title: refTitle.current.value,
      description: refDescription.current.value,
      date: refDueDate.current.value,
      piority: refPiority.current.value,
      visible : todo.visible 
    };
    onClick(_todo);
  };
  useEffect(() => {
    refTitle.current.value = todo.title || "";
    refDescription.current.value = todo.description || "";
    refDueDate.current.value = todo.date || null;
    refPiority.current.value = todo.piority || "normal";
  }, [todo]);
  return (
    <div className="new-task">
      <form className="form-2">
        <h1 className="form-task"> {title} </h1>
        <input
          type="text"
          placeholder="title..."
          className="title-input"
          name="title"
          ref={refTitle}
        />
        <br />
        <label>
          <b>Descreption </b>
        </label>
        <br />
        <textarea
          name="descreption"
          ref={refDescription}
          className="description-input"
          cols="30"
          rows="10"
        ></textarea>
        <br />
        <div id="table-list">
          <div>
            <label>
              <b>Due Date</b>
            </label>
            <br />
            <input
              name="date"
              ref={refDueDate}
              type="date"
              className="date-input"
            />
            <br />
          </div>
          <div>
            <label>
              <b>Piority</b>
            </label>
            <br />
            <select name="prolity" ref={refPiority} className="piority-input">
              <option value="normal">Nomal</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <br />
        <button className="add" onClick={handleClick}>
          {action}
        </button>
      </form>
    </div>
  );
};

export default TodoInfo;
