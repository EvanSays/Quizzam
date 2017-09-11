import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CreateQuiz from './CreateQuiz';
import FolderAsideContainer from '../containers/FolderAsideContainer';

class App extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {

    return (
      <section className="App">
        {/* <FolderAsideContainer /> */}
        <CreateQuiz />
      </section>
    );
  }
}

export default App;
