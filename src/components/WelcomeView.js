import React, { Component } from 'react';
import { object } from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';
import flash from '../assets/flash.svg';
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
    const logo = { backgroundImage: `url(${flash})` };

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
        <LoginFormContainer location={location} isHidden={isHidden} />
        <header className="welcome-header">
          <Link to="/" className="welcome-logo-ink">
            <div style={logo} className="welcome-logo"></div>
            <h1 className="logo-title">Quizzam</h1>
          </Link>
          <nav className="welcome-nav">
            <Link
              to="/login"
              id="login"
              className="nav-link"
              onClick={this.handleOnClick}
            >Login/Register
            </Link>
          </nav>
        </header>
        <main className="welcome-main">
          <h1 className="welcome-title">Quizzam</h1>
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
