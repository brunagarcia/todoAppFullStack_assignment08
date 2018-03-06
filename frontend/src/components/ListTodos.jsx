import React, { Component } from "react";
import SingleTodo from "./SingleTodo";

//Component List
export default class ListTodos extends Component {

    render(){
      const todosList = this.props.todosList;
      let listJSX = todosList.map((todo, i) => {
        if(this.props.filter === 'COMPLETE') return todo.complete
        else if(this.props.filter === 'INCOMPLETE') return !todo.complete
        else return <SingleTodo todo={todo}  
        markDone={this.props.markDone}/>;

      })

    return (
        <div className="container" id="contentList">
            <ul className="list">{listJSX}</ul>
            <button className="btn btn-danger" onClick={() => {
                this.props.clearTodoFunc();
              }}>
              Clear Tasks
            </button>
          </div>
    )
  }
}
