import React, { Component } from "react";
import { FilterValues } from '../constants'
//Component List
export default class ListTodos extends Component {

    render(){

    return (
      <div className="seletcList">
        <select onChange={
          (e) => {
            this.props.updateFilter(e.target.value)
          }
        }>
          <option value={FilterValues.All}>All</option>
          <option value={FilterValues.Complete}>Completed</option>
          <option value={FilterValues.Incomplete}>Incomplete</option>
        </select>
      </div>
    )
  }
}