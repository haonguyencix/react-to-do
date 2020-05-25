import React, { Component } from "react";
import "./style.css";
import PropTypes from "prop-types";

class TaskItem extends Component {
  render() {
    const { _removeTask, _handleSelect } = this.props;
    const { id, content, completed } = this.props.taskItem;

    return (
      <tr className={`${completed ? "selected" : ""}`}>
        <td>
          <input type="checkbox" onChange={(e) => _handleSelect(e, id)} checked={completed} />
        </td>
        <td>{content}</td>
        <td>{completed ? "Complete" : "Active"}</td>
        <td className="remove" onClick={() => _removeTask(id)}>
          [x]
        </td>
      </tr>
    );
  }
}

TaskItem.propTypes = {
  taskItem: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    completed: PropTypes.bool,
  }),
  _removeTask: PropTypes.func,
  _handleSelect: PropTypes.func,
};

export default TaskItem;
