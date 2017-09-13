import React, { Component } from 'react';
import { object, array, string, func } from 'prop-types';
import './styles/TakeQuiz.scss';
import { questionTypes } from '../helpers';

export default class TakeQuiz extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      answers: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.determineInputType = this.determineInputType.bind(this);
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
  }

  handleClick(event) {
    const { textContent } = event.target;
    const { questions } = this.props.quiz;
    const { currentQuestion } = this.state;

    if (textContent === 'Next' && currentQuestion < questions.length - 1) {
      const newState = this.state.currentQuestion + 1;
      this.setState({ currentQuestion: newState });
    } else if (textContent === 'Prev' && currentQuestion > 0) {
      const newState = this.state.currentQuestion - 1;
      this.setState({ currentQuestion: newState });
    }
  }

  handleSelectAnswer(event) {
    const newState = [...this.state.answers];

    const newAnswer = {
      answer: event.target.value,
      answer_id: event.target.id,
    };

    newState[this.state.currentQuestion] = newAnswer;

    this.setState({ answers: newState });
  }

  determineInputType(answer) {
    switch (this.props.quiz.questions[this.state.currentQuestion].question_type) {
      case 'multiple choice-multiple answer':
        return (
          <div key={`answer_${answer.id}`}>
            <input
              type="checkbox"
              id={`answer_${answer.id}`}
              name={this.props.quiz.questions[this.state.currentQuestion].question_text}
              value={answer.answer_text}
              onChange={this.handleSelectAnswer}
            />
            <label htmlFor={`answer_${answer.id}`}>{answer.answer_text}</label>
          </div>
        );
      default:
        return (
          <div key={answer.answer_text}>
            <input
              type="radio"
              id={answer.answer_text}
              name={this.props.quiz.questions[this.state.currentQuestion].question_text}
              value={answer.answer_text}
              onChange={this.handleSelectAnswer}
            />
            <label htmlFor={answer.answer_text}>{answer.answer_text}</label>
          </div>
        );
    }
  }

  render() {
    if (!this.props.quiz.id) {
      return <h3>LOADING</h3>;
    }

    return (
      <main>
        <header>
          <h1>{this.props.quiz.name}</h1>
          <h1>Subject: {this.props.quiz.subject}</h1>
          <h1>Room: {this.props.quiz.id}</h1>
        </header>
        <section>
          <h3>{this.props.quiz.questions[this.state.currentQuestion].question_text}</h3>
          <p>({questionTypes[this.props.quiz.questions[this.state.currentQuestion].question_type]})</p>
          <form>
            {this.props.quiz.questions[this.state.currentQuestion].answers.map((answer, index) => {
              return this.determineInputType(answer);
            })}
          </form>
        </section>

        <footer>
          <button onClick={this.handleClick}>Prev</button>
          <button onClick={this.handleClick}>Next</button>
        </footer>
      </main>
    );
  }
}
