import React, { Component } from "react";
import "./style.css";
import PropTypes from "prop-types";
import TaskItem from "../TaskItem";

class TaskList extends Component {
  render() {
    const {
      tasks = [],
      selected = [],
      _removeTask,
      _handleSelectAll,
      _handleSelect,
      filterByStatus,
    } = this.props;

    let filterTasks = [];

    if (filterByStatus === -1) {
      filterTasks = tasks;
    } else {
      for (let task of tasks) {
        if (task.completed === filterByStatus) {
          filterTasks = [...filterTasks, task];
        }
      }
    }

    const renderTaskItem =
      filterTasks !== null &&
      filterTasks.map((item, index) => (
        <TaskItem
          key={index}
          taskItem={item}
          _removeTask={_removeTask}
          _handleSelect={_handleSelect}
        />
      ));

    return (
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => _handleSelectAll(e)}
                checked={tasks.length > 0 && selected.length === tasks.length}
              />
            </th>
            <th>To do list</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderTaskItem}</tbody>
      </table>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.string,
      completed: PropTypes.bool,
    })
  ),
  selected: PropTypes.arrayOf(PropTypes.string),
  _removeTask: PropTypes.func,
  _handleSelectAll: PropTypes.func,
  _handleSelect: PropTypes.func,
  filterByStatus: PropTypes.bool,
};

export default TaskList;
