import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//Database

//You can add category as well to list todos.
const todosList = [
  {
    title: "Groceries",
    complete: false,
    key: 1
  },
  {
    title: "Walk Dog",
    complete: false,
    key: 2
  },
  {
    title: "Homework",
    complete: false,
    key: 3
  }
];


const doneList = [];


const completeList = [];


ReactDOM.render(
  <App todosList={todosList} doneList={doneList} />,
  document.getElementById("root")
);
registerServiceWorker();
