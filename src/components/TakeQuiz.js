import React, { Component } from 'react';
import { object, array, string, func } from 'prop-types';
import './styles/TakeQuiz.scss';
import { questionTypes } from '../helpers';

export default class TakeQuiz extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      answers: [{ selected_answers: null }],
    };
    this.handleClick = this.handleClick.bind(this);
    this.determineInputType = this.determineInputType.bind(this);
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
  }

  componentDidMount() {
    const initialState = [];
    for (let i = 0; i < this.props.quiz.questions.length; i += 1) {
      initialState.push({ selected_answers: null });
    }
    this.setState({ answers: initialState });
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
    const newAnswer = {
      selected_answers: event.target.id.charAt(event.target.id.length - 1),
    };
    const newState = [...this.state.answers];

    newState[this.state.currentQuestion] = newAnswer;
    this.setState({ answers: newState });
  }

  determineInputType(answer, index) {
    switch (this.props.quiz.questions[this.state.currentQuestion].question_type) {
      case 'multiple choice-multiple answer':
        return (
          <div key={`answer_${answer.id}`}>
            <input
              type="checkbox"
              id={`answer_id_${answer.id}`}
              name={index}
              value={answer.answer_text}
              onChange={this.handleSelectAnswer}
            />
            <label htmlFor={`answer_id_${answer.id}`}>{answer.answer_text}</label>
          </div>
        );
      default:
        return (
          <div key={answer.answer_text}>
            <input
              type="radio"
              id={`answer_id_${answer.id}`}
              name={index}
              value={answer.answer_text}
              onChange={this.handleSelectAnswer}
              checked={this.state.answers[this.state.currentQuestion].selected_answers == answer.id}
            />
            <label htmlFor={`answer_id_${answer.id}`}>{answer.answer_text}</label>
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
              return this.determineInputType(answer, index);
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
