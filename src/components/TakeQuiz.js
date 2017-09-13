import React, { Component } from 'react';
import { object, array, string, func } from 'prop-types';
import './styles/TakeQuiz.scss';

export default class TakeQuiz extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      answers: [],
    };
    this.handleClick = this.handleClick.bind(this);
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
          <div>
            {this.props.quiz.questions[this.state.currentQuestion].answers.map((answer) => {
              return <p>{answer.answer_text}</p>;
            })}
          </div>
        </section>

        <footer>
          <button onClick={this.handleClick}>Prev</button>
          <button onClick={this.handleClick}>Next</button>
        </footer>
      </main>
    );
  }
}
