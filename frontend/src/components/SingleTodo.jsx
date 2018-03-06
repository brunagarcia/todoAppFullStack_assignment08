import React, { Component } from 'react';


export default class SingleTodo extends Component {
  render() {
    return (
      <li>  
        <input type="checkbox" checked={this.props.todo.complete} onClick={() => {
              this.props.markDone(this.props.todo.key);
          }} />
        <label>
          {this.props.todo.title}
        </label>
      </li>
    )
  }
}

