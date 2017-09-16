import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz';
import QuizListContainer from '../containers/QuizListContainer';
import WelcomeViewContainer from '../containers/WelcomeViewContainer';
import FolderAsideContainer from '../containers/FolderAsideContainer';

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

    const aside = room ? null : <FolderAsideContainer history={history} />
    return (
      <section className="App">
        {aside}
        <Route path="/folder" component={QuizListContainer} />
        <Route path="/quiz" component={CreateQuiz} />
        <Route path="/dashboard/quiz/:id" component={EditQuiz} />
      </section>
    );
  }
}

export default App;
