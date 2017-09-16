import React from 'react';
import { object } from 'prop-types';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import LoginFormContainer from '../containers/LoginFormContainer';
import CodeFormContainer from '../containers/CodeFormContainer';
import './styles/WelcomeView.scss';

const WelcomeView = ({ quiz, user }) => {
  if (user.id) {
    return <Redirect to={'/dashboard'} />;
  }
  if (quiz.id) {
    return (<Redirect to={{
      pathname: `/room/${quiz.id}`,
      state: { user: user.id },
    }}
    />);
  }

  return (
    <section className="welcome-view">
      <header className="welcome-header">
        <Link to="/" className="welcome-logo">Logo</Link>
        <nav className="welcome-nav">
          <NavLink
            to="/login"
            id="login"
            className="nav-link"
            activeClassName="active-link"
          >Log In
          </NavLink>
          <NavLink
            to="/signup"
            id="signup"
            className="nav-link"
            activeClassName="active-link"
          >Sign Up
          </NavLink>
        </nav>
      </header>
      <main className="welcome-main">
        <Route path="/login" component={LoginFormContainer} />
        <Route path="/signup" component={LoginFormContainer} />
        <CodeFormContainer />
      </main>
    </section>
  );
};

WelcomeView.PropTypes = {
  quiz: object,
};

export default WelcomeView;
