import React, { Component } from "react";
import "./style.css";
import PropTypes from "prop-types";

class Filter extends Component {
  render() {
    const { numLeft, _clearCompleted, _changeFilterByStatus } = this.props;

    return (
      <div className="row align-items-center justify-content-between">
        <div className="col-3">
          <span>
            {numLeft} task{numLeft > 1 ? "s" : ""} left
          </span>
        </div>
        <div className="col-3 text-center">
          <div className="d-flex align-items-center justify-content-between">
            <button onClick={() => _changeFilterByStatus(-1)} className="btn btn-outline-danger">All</button>
            <button onClick={() => _changeFilterByStatus(false)} className="btn btn-outline-danger">Active</button>
            <button onClick={() => _changeFilterByStatus(true)} className="btn btn-outline-danger">Completed</button>
          </div>
        </div>
        <div className="col-3 text-right">
          <span onClick={() => _clearCompleted()} className="clear-completed">Clear completed</span>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  numLeft: PropTypes.number,
  _clearCompleted: PropTypes.func,
  _changeFilterByStatus: PropTypes.func
};

export default Filter;
