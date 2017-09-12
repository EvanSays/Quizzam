import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import LoginFormContainer from '../containers/LoginFormContainer';
import CodeForm from './CodeForm';
import './styles/WelcomeView.scss';

class WelcomeView extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: '',
    };
  }

  render() {
    const { activeLink } = this.state;


    return (
      <section className="welcome-view">
        <header className="welcome-header">
          <Link to="/" className="welcome-logo">Logo</Link>
          <nav className="welcome-nav">
            <NavLink to="/login" id="login" className="nav-link" activeClassName="active-link">Log In</NavLink>
            <NavLink to="/signup" id="signup" className="nav-link" activeClassName="active-link">Sign Up</NavLink>
          </nav>
        </header>
        <main className="welcome-main">
          <Route path="/login" component={LoginFormContainer} />
          <Route path="/signup" component={LoginFormContainer} />
          <CodeForm />
        </main>
      </section>
    );
  }
}

export default WelcomeView;
