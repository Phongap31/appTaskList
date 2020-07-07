import React, { Component } from "react";
import ListToto from "../components/ListTodo";
import "./ManagerList.css";
import moment from "moment";
import { debounce, map } from "lodash";
import uuid from "uuid/dist/v4";
import TodoInfo from "../components/TodoInfo";
import Swal from "sweetalert2";
export default class ListTodoManagement extends Component {
  constructor(props) {
    super(props);
    this.refSearchText = React.createRef();
    this.handleRemove = this.handleRemove.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.showForm = this.showForm.bind(this);
    this.bulkRemove = this.bulkRemove.bind(this);
  }
  sortTodo = (todos) => {
    return todos.sort((a, b) => moment(a.date).diff(b.date));
  };
  state = {
    todos: [
      {
        id: uuid(),
        title: "Do homework",
        date: "2020-01-01",
        description: "do it....",
        status: true,
        piority: "normal",
        visible: true,
      },
      {
        id: uuid(),
        title: "Do housework",
        date: "2020-01-01",
        description: "do it....",
        status: true,
        piority: "normal",
        visible: true,
      },
    ],
    currentTodo: null,
  };

  handleSeachChange = debounce(() => {
    const searchText = this.refSearchText.current.value;
    console.log(searchText)
    const newRegex = new RegExp(searchText, "gi");
    const matchTodos = map(this.state.todos, (todo) => {
      if (todo.title.match(newRegex)) {
        todo.visible = true;
      } else {
        todo.visible = false;
      }
      return todo;
    });
    this.setState({
      todos: matchTodos,
    });
  }, 500);

  updateTodo = (_todo) => {
    const curTodos = this.state.todos;
    const newTodos = curTodos.map((todo) => {
      if (todo.id === _todo.id) {
        todo = _todo;
      }
      return todo;
    });
    const sortTodos = this.sortTodo(newTodos);
    this.setState({
      todos: sortTodos,
    });
  };
  changeStatus(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) todo.status = !todo.status;
        return todo;
      }),
    });
  }
  chooseTodo = (id) => {
    this.setState({
      currentTodo: id,
    });
  };
  handleRemove(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }
  showForm(id) {
    const todo = this.state.todos.find((task) => task.id === id);
    return (
      todo && (
        <TodoInfo
          todo={todo}
          onClick={this.updateTodo}
          action="Update"
          title="Detail"
        />
      )
    );
  }

  addTodo(todo) {
    const newTodos = [...this.state.todos, {...todo,visible:true}];
    const sortTodos = this.sortTodo(newTodos);
    this.setState({
      todos: sortTodos,
    });
  }
  bulkRemove() {
    this.setState({
      todos: [],
    });
  }
  bulkDone() {
    return Swal.fire("The all is completed!", "Success", "success");
  }
  render() {
    return (
      <div id="container">
        <div className="todo-list">
          <form className="form-1">
            <h1 className="form-list">To Do List</h1>
            <input
              type="text"
              placeholder="search...."
              className="search-input"
              ref={this.refSearchText}
              onChange={this.handleSeachChange}
            />
            <ListToto
              className="todos"
              todos={this.state.todos}
              handleRemove={this.handleRemove}
              changeStatus={this.changeStatus}
              showForm={this.showForm}
              chooseTodo={this.chooseTodo}
            />
          </form>
          <div className="bulk-action">
            <div className="action">Bulk Action: </div>
            <div>
              <button onClick={this.bulkDone} className="done">
                Done
              </button>
              <button onClick={this.bulkRemove} className="remove">
                Remove
              </button>
            </div>
          </div>
        </div>
        <br />
        <TodoInfo action="Add" title="New Task" onClick={this.addTodo} />
        {this.state.currentTodo && this.showForm(this.state.currentTodo)}
      </div>
    );
  }
}
