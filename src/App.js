import React, { Component, Fragment } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import InputText from "./components/InputText";
import Tasks from "./model/tasks";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selected: [],
      filterByStatus: false
    };
  }

  _addTask = (task) => {
    task.id = Math.random().toString(36).substr(2, 9); // random ID
    Tasks.addTask(task);
    this.setState({
      tasks: Tasks.list,
    });
  };

  _removeTask = (taskId) => {
    Tasks.removeTask(taskId);
    this.setState({
      tasks: Tasks.list,
    });
  };

  _clearCompleted = () => {
    Tasks.clearCompleted();
    this.setState({
      tasks: Tasks.list,
    });
  };

  _handleSelectAll = (e) => {
    const newSelecteds = this.state.tasks.map((task) => task.id);

    if (e.target.checked) {
      Tasks.updateAllStatus(newSelecteds, true);
      this.setState({
        tasks: Tasks.list,
        selected: newSelecteds,
      });
      return;
    }

    Tasks.updateAllStatus(newSelecteds, false);
    this.setState({
      tasks: Tasks.list,
      selected: [],
    });
  };

  _handleSelect = (e, taskId) => {
    const { selected } = this.state;

    const selectedIndex = selected.indexOf(taskId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, taskId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    if (e.target.checked) {
      Tasks.updateStatus(taskId, true);
    } else {
      Tasks.updateStatus(taskId, false);
    }

    this.setState({
      tasks: Tasks.list,
      selected: newSelected,
    });
  };

  _changeFilterByStatus = filterByStatus => {
    this.setState({ filterByStatus })
  }

  componentDidMount = () => {
    const tasksLocal = localStorage.getItem("tasks");

    if (!tasksLocal) return;

    Tasks.list = JSON.parse(tasksLocal);

    this.setState({
      tasks: Tasks.list,
    });
  };

  render() {
    return (
      <Fragment>
        <h1 className="text-center mb-5">REACT TO DO LIST</h1>
        <div className="container">
          <InputText _addTask={this._addTask} />
          <TaskList
            tasks={this.state.tasks}
            _removeTask={this._removeTask}
            _handleSelectAll={this._handleSelectAll}
            _handleSelect={this._handleSelect}
            selected={this.state.selected}
            filterByStatus={this.state.filterByStatus}
          />
          <Filter
            numLeft={this.state.tasks.length - this.state.selected.length}
            _clearCompleted={this._clearCompleted}
            _changeFilterByStatus={this._changeFilterByStatus}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
