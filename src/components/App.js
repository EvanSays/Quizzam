import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditQuiz from './EditQuiz';
import QuizListContainer from '../containers/QuizListContainer';
import WelcomeViewContainer from '../containers/WelcomeViewContainer';
import FolderAsideContainer from '../containers/FolderAsideContainer';
import CreateQuizContainer from '../containers/CreateQuizContainer';

class App extends Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { user, history, room, quiz } = this.props;

    if (!user.id) {
      return <WelcomeViewContainer history={history} />;
    }

    if (room) {
      return (<Redirect to={{
        pathname: `/room/${room}`,
        state: { user: user.id, quiz },
      }}
      />);
    }

    const aside = room ? null : <FolderAsideContainer history={history} />;
    return (
      <section className="App">
        {aside}
        <Route path="/folder" component={QuizListContainer} />
        <Route path="/quiz" component={CreateQuizContainer} />
        <Route path="/dashboard/quiz/:id" component={EditQuiz} />

      </section>
    );
  }
}

App.propTypes = {
  history: PropTypes.number,
  quiz: PropTypes.object,
  room: PropTypes.object,
  user: PropTypes.object,
};

export default App;
