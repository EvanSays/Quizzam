import React, { Component } from 'react';
import { object } from 'prop-types';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import LoginFormContainer from '../containers/LoginFormContainer';
import CodeFormContainer from '../containers/CodeFormContainer';
import './styles/WelcomeView.scss';

class WelcomeView extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  render() {
    const { quiz, user, location } = this.props;
    const { isHidden } = this.state;
    
    if (user.id) {
      return <Redirect to={'/'} />;
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
              onClick={this.handleOnClick}
            >Login/Register
            </NavLink>
          </nav>
        </header>
        <main className="welcome-main">
          <LoginFormContainer location={location} isHidden={isHidden} />
          <CodeFormContainer />
        </main>
      </section>
    );
  }
}

WelcomeView.PropTypes = {
  quiz: object,
};

export default WelcomeView;
