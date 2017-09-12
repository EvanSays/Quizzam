import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CreateQuiz from './CreateQuiz';
import QuizListContainer from '../containers/QuizListContainer';
import FolderAsideContainer from '../containers/FolderAsideContainer';

class App extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    if (!this.props.user.id) {
      return <Redirect to={'/'} />;
    }
    return (
      <section className="App">
        <FolderAsideContainer />
        <QuizListContainer />
        <CreateQuiz />
      </section>
    );
  }
}

export default App;
