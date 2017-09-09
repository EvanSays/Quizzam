import React, { Component } from 'react';
import CreateQuiz from './CreateQuiz';

class App extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <section className="App">

        <CreateQuiz />

      </section>
    );
  }
}

export default App;
