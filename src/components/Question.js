<<<<<<< HEAD
import React, { Component } from 'react';
import { getKey } from '../helpers';
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
      </section>
    );
  }
}

export default Question;
=======
import React from 'react';

const Question = ({ id }) => {
  return (
    <input id={id} type="text" placeholder="Question"/>
  );
};

export default Question;
>>>>>>> add loop to render a new quuestion and answer
