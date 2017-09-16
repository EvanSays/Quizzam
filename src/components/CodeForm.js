import React, { Component } from 'react';
import './styles/CodeForm.scss';

class CodeForm extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    const code = event.target.value;

    this.setState({ code });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { code } = this.state;
    const { fetchQuiz } = this.props;

    fetchQuiz(code);
    this.setState({ code: '' });
  }

  render() {
    return (
      <form className="code-form" onSubmit={this.handleOnSubmit} action="">
        <input className="code-input" onChange={this.handleOnChange} type="text" value={this.state.code} placeholder="Enter Code!" />
        <button className="code-btn">Press enter to start or <span>click here</span></button>
      </form>
    );
  }
}

export default CodeForm;
