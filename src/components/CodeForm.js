import React, { Component } from 'react';
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
  }

  handleOnChange(event) {
    const code = event.target.value;

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
    this.setState({ code: '', name: '' });
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
          className="name-input"
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

export default CodeForm;
