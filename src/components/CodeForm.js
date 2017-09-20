import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socket from '../socket';
import './styles/CodeForm.scss';

class CodeForm extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      name: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.sendSocket = this.sendSocket.bind(this);
  }

  handleOnChange(event) {
    const code = event.target.value.toUpperCase();

    this.setState({ code });
  }

  handleNameInput(event) {
    const name = event.target.value;

    this.setState({ name });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { code, name } = this.state;
    const { fetchQuiz } = this.props;

    fetchQuiz(code, name);
    this.sendSocket();
    this.setState({ code: '', name: '' });
  }

  sendSocket() {
    socket.emit('login', { name: this.state.name, room: this.state.code });
  }

  render() {
    return (
      <form className="code-form" onSubmit={this.handleOnSubmit} action="">
        <input
          className="code-input"
          onChange={this.handleOnChange}
          type="text"
          value={this.state.code}
          placeholder="Enter Code!"
          maxLength="4"
        />
        <input
          className="code-input"
          onChange={this.handleNameInput}
          type="text"
          value={this.state.name}
          placeholder="Enter your name!"
        />
        <button className="code-btn">Press enter or<span>click here</span> to start</button>
      </form>
    );
  }
}

CodeForm.propTypes = {
  fetchQuiz: PropTypes.func,
};

export default CodeForm;
