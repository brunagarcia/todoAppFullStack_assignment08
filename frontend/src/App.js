import React, { Component } from 'react';
import NavHeader from './components/NavHeader';
import ListTodos from './components/ListTodos';
import AddTodo from './components/AddTodo';

import axios from 'axios';

import FilterTodos from './components/FilterTodos';
import { FilterValues } from './constants' 
import './App.css';

//Parent Component!
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completeList: props.completeList,
      doneList: props.doneList,
      todosList: [],
      // filter: "all"
      filter: FilterValues.All  //Set our intial filter to 'All'
    };
  }

  //Function to add task to the array.
  //It will get the user input as parameter and assign to title on newTodo.
  pushTodo = (e) => {
    e.preventDefault();
    
    if (e.target.userInput.value !== "") {
      //axios posting to express
      axios.post("http://localhost:8080/addtodo", {
      title: e.target.userInput.value,
      complete: false,
      key: new Date().getTime()
    })
      .then((response) => {
          console.log(response);
          axios.get('http://localhost:8080/gettodo')
          .then ((response) => {
            this.setState({
            todosList: response.data
          })
        })
      })

      .catch((err) => {
        console.log(err);
      })
    
    e.target.userInput.value = ""

    }
  }


  //Function to check task done or to be complete.
  //It will change the attribute complete of the object, on base of checking the check box.
  markDone = todo => {

    axios.put('http://localhost:8080/updatetodo', {
      key: todo.key,
      complete: !todo.complete
    })
      .then(response => {
        console.log(response)
        if(response.data.success){
          console.log("it worked :)")
        }
      })

      this.state.todosList.forEach(singleTodo => {
        if (singleTodo.key === todo.key) {
          todo.complete = !todo.complete;
        }
      });
      this.setState({
        todosList: this.state.todosList
      });
  };

  // Function to clean the todo list.
  // check if the complete state are true, if yes, when click the button change to false.
  clearTodoFunc = () => {
    axios.delete("http://localhost:8080/deletetodo")

    let result = this.state.todosList.filter(todo => todo.complete === true);
    let rest = this.state.todosList.filter(todo => todo.complete === false);

   
    this.setState({
      completeList: this.state.todosList,
      doneList: this.state.doneList.concat(result),
      todosList: rest
    });
  };

  updateFilter = (filter) => {
    this.setState({
      filter
    })

  }


  //Nic's way
  async componentWillMount(){
    const res = await axios('http://localhost:8080/gettodo')
    const data = await res.data
          this.setState({
            todosList: data
          })
    }

  render() {
    return (
          //  (this.state.todosList) && (   

      <div className="container text-center">
          <NavHeader />
          {/* <FilterTodos updateFilter={this.updateFilter} /> */}
        <div className="addCenter text-justify">
          <AddTodo pushTodo={this.pushTodo} />
        </div>
        <FilterTodos updateFilter={this.updateFilter}/>
        <div className="listCenter">
          <ListTodos
            todosList={this.state.todosList}
            filter={this.state.todosList.complete}
            clearTodoFunc={this.clearTodoFunc}
            markDone={this.markDone}
          />
        </div>
      </div>

    );
  }
}


export default App;
