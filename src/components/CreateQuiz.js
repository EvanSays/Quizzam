import React, { Component } from 'react';
import Question from './Question';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  addAnswer(id) {
    const { answers } = this.state.questions[id];
    const answerLength = Object.keys(answers).length;
    const newKey = `a${answerLength}`;
    const newQuestions = [...this.state.questions];

    const newAnswers = Object.assign({}, answers, { [newKey]: '' });

    newQuestions[id].answers = newAnswers;

    this.setState({ questions: newQuestions });
  }

  render() {
    return (
      <section>
        <Question />
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
