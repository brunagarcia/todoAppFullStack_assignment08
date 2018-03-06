import React, { Component } from "react";

export default class AddTodo extends Component{


  render(){

    return( 
      <form onSubmit={(e) => {this.props.pushTodo(e)}} 
          className="input form-inline align-self-center">

          <input 
              type="text" 
              className="form-inline" 
              name="userInput"
              placeholder="Type your task here:" />

          <button type="submit" className="btn btn-light form-inline">
            <i className="far fa-hand-pointer" />
          </button>

      </form>
    )
  }
}
