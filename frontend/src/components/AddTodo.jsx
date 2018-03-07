import React, { Component } from "react";

export default class AddTodo extends Component{


  render(){

    return( 
      <form onSubmit={(e) => {this.props.pushTodo(e)}} 
          className="input">

          <input 
              type="text" 
              className="form-control" 
              name="userInput"
              placeholder="Type your task here and press enter!" />

          {/* // <button type="submit" className="btn btn-light form-inline">
          //   <i className="far fa-hand-pointer" />
          // </button> */}

      </form>
    )
  }
}
