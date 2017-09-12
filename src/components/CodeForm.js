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

    this.setState({ code: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit} action="">
        <h2>Enter Code</h2>
        <input onChange={this.handleOnChange} type="text" value={this.state.code} />
        <button>Submit</button>
      </form>
    );
  }
}

export default CodeForm;
