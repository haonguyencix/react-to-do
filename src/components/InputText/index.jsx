import React, { Component } from "react";
import PropTypes from "prop-types";
import task from "../../model/task";

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = task;
  }

  _handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _handleReset = () => {
    this.setState({
      content: "",
    });
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props._addTask(this.state);
    this._handleReset();
  };

  render() {
    return (
      <form
        className="d-flex align-items-center mb-3"
        onSubmit={this._handleSubmit}
      >
        <input
          type="text"
          name="content"
          autoComplete="off"
          value={this.state.content}
          className="form-control mr-2"
          placeholder="What needs to be done?"
          onChange={this._handleChange}
        />
        <button type="submit" className="btn btn-danger">
          Submit
        </button>
      </form>
    );
  }
}

InputText.propTypes = {
  _addTask: PropTypes.func,
};

export default InputText;
