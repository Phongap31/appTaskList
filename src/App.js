import React from 'react';
import './App.css';
import ListTodoManagement from './containers/ListTodoManagement'
import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  return (
    <div className="">
      <Router>
        <Route path = '/' component = {ListTodoManagement}></Route>
      </Router>
    </div>
  );
}

export default App;
