import React, { Component } from 'react';
import Question from './Question';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <section>
        <Question />
      </section>
    );
  }
}

export default CreateQuiz;
