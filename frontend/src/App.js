import React, { Component } from 'react';
import NavHeader from './components/NavHeader';
import ListTodos from './components/ListTodos';
import AddTodo from './components/AddTodo';
// import FilterTodos from './components/FilterTodos';
import './App.css';

//Parent Component!
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completeList: props.completeList,
      doneList: props.doneList,
      todosList: props.todosList,
      // filter: "all"
    };
  }

  //Mounting just occurs one time.
  componentWillMount() {
    let todosList = JSON.parse(localStorage.getItem("TODOS"))
    // let filter = JSON.parse(localStorage.getItem("FILTER"))

    if(!todosList) todosList = this.props.todosList
    // if(!filter) filter = filter.ALL
    this.setState({

    })
  }

  componentDidUpdate() {
    localStorage.setItem("TODOS", JSON.stringify(this.state.todosList))
    // localStorage.setItem("FILTER", JSON.stringify(this.state.filter))
  }

  //Function to add task to the array.
  //It will get the user input as parameter and assign to title on newTodo.
  //and after re define todosList (main data).
  pushTodo = (e) => {
    e.preventDefault();
    if (e.target.userInput.value !== "") {
      let newTodo = {
        title: e.target.userInput.value,
        complete: false,
        key: new Date().getTime()
      };
      this.setState({
        todosList: this.state.todosList.concat(newTodo)
      })
    }
    e.target.userInput.value = ""
  };

  //Function to check task done or to be complete.
  //It will change the attribute complete of the object, on base of checking the check box.
  markDone = key => {
    this.state.todosList.forEach(todo => {
      if (todo.key === key) {
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
    let result = this.state.todosList.filter(todo => todo.complete === true);
    let rest = this.state.todosList.filter(todo => todo.complete === false);
    this.setState({
      completeList: this.state.todosList,
      doneList: this.state.doneList.concat(result),
      todosList: rest
    });
  };

  // componentDidUpdate()

  // updateFilter = (filter) => {
  //   this.setState({
  //     filter
  //   })

  // }

  render() {
    return (
      <div>
        <NavHeader />
        {/* <FilterTodos updateFilter={this.updateFilter} /> */}
        <AddTodo pushTodo={this.pushTodo} />
        <ListTodos
          filter={this.state.todosList.complete}
          todosList={this.state.todosList}
          clearTodoFunc={this.clearTodoFunc}
          markDone={this.markDone}
        />
      </div>
    );
  }
}


export default App;
