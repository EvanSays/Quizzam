import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import CreateQuiz from './CreateQuiz';
import QuizListContainer from '../containers/QuizListContainer';
import FolderAsideContainer from '../containers/FolderAsideContainer';

class App extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    console.log(this.props);
    if (!this.props.user.id) {
      return <Redirect to={'/'} />;
    }
    return (
      <section className="App">
        <FolderAsideContainer />
        <Route path="/dashboard/folder/:id" component={QuizListContainer} />
        <Route path="/quiz" component={CreateQuiz} />
        {/* <Route path="/room/:id" component={Room} />; */}
      </section>
    );
  }
}

export default App;
