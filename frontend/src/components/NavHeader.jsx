import React, { Component } from "react";

export default class NavHeader extends Component{    
  render(){
    console.log("Nav Component")
  return (
          <header className="jumbotron">
            <h1 className="App-title">To Do List</h1>
          </header>
      )
  }
}

//export default NavHeader; ---> Another way of exporting