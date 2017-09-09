import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles/WelcomeView.scss';

const WelcomeView = () => {
  return (
    <section className="welcome-view">
      <header className="welcome-header">
        <Link to="/" className="welcome-logo">Logo</Link>
        <nav className="welcome-nav">
          <NavLink to="/login" className="nav-link" activeClassName="active-link">Log in</NavLink>
          <NavLink to="/signup" className="nav-link" activeClassName="active-link">Sign up</NavLink>
        </nav>
      </header>
      <main className="welcome-main">
        Welcome duds
      </main>
    </section>
  );
};

export default WelcomeView;