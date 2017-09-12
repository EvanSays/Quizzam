import React, { Component } from 'react';
import './styles/LoginForm.scss';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { pathname } = this.props.location;
    const { email, password } = this.state;
    const { signUp, login } = this.props;

    if (pathname === '/signup') {
      signUp(this.state);
    } else {
      login({ email, password });
    }
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    });
  }

  handleOnChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { pathname } = this.props.location;
    const formClass = pathname.slice(1);
    const { first_name, last_name, email, password } = this.state;

    return (
      <form onSubmit={this.handleOnSubmit} className={formClass}>
        <input
          id="first_name"
          className="login-input"
          type="text"
          placeholder="first name"
          value={first_name}
          onChange={this.handleOnChange}
        />
        <input
          id="last_name"
          className="login-input"
          type="text"
          placeholder="last name"
          value={last_name}
          onChange={this.handleOnChange}
        />
        <input
          id="email"
          className="login-input"
          type="text"
          placeholder="email"
          value={email}
          onChange={this.handleOnChange}
        />
        <input
          id="password"
          className="login-input"
          type="text"
          placeholder="password"
          value={password}
          onChange={this.handleOnChange}
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default LoginForm;
