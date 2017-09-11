import React, { Component } from 'react';
import { func } from 'prop-types';
import { getKey } from '../helpers';
import PropTypes from 'prop-types';

import Answer from './Answer';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      answers: {},
    };

    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleAddNewAnswer = this.handleAddNewAnswer.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
  }

  handleQuestionInput(e) {
    this.setState({ title: e.target.value });
  }

  handleAddNewAnswer() {
    const answers = Object.assign({}, this.state.answers, { [getKey()]: '' });

    this.setState({ answers });
  }

  handleOnChange(e) {
    const answers = this.state.answers;

    answers[e.target.id] = e.target.value;
    this.setState({ answers });
  }

  handleAddQuestion() {
    const { addQuestion } = this.props;
    const { title } = this.state;
    const { answers } = this.state;

    addQuestion({ title, answers });
  }

  render() {
    const answers = Object.keys(this.state.answers).map((answer) => {
      return (
        <Answer
          key={answer}
          id={answer}
          onChange={this.handleOnChange}
          value={this.state.answers[answer]}
        />
      );
    });

    return (
      <section className="question">
        <h1>QUESTION</h1>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleQuestionInput}
          placeholder="Enter Question"
        />
        {answers}
        <button onClick={this.handleAddNewAnswer}>Add Answer</button>
        <button onClick={this.handleAddQuestion}>Submit Question</button>
      </section>
    );
  }
}

Question.propTypes = {
  addQuestion: func,
};

export default Question;
