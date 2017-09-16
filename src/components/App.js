import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz';
import QuizListContainer from '../containers/QuizListContainer';
import FolderAsideContainer from '../containers/FolderAsideContainer';

class App extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { user, history } = this.props;

    if (!user.id) {
      return <Redirect to={'/'} />;
    }
    return (
      <section className="App">
        <FolderAsideContainer history={history} />
        <Route path="/dashboard/folder/:id" component={QuizListContainer} />
        <Route path="/quiz" component={CreateQuiz} />
        <Route path="/dashboard/quiz/:id" component={EditQuiz} />
        {/* <Route path="/room/:id" component={Room} />; */}
      </section>
    );
  }
}

export default App;
