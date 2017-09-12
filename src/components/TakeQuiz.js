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

  componentDidMount() {
    this.props.fetchQuiz('AAAA');
  }

  handleClick(event) {
    const { textContent } = event.target;
    const { questions } = this.props.getQuiz;
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
    if (!this.props.getQuiz.id) {
      return <h3>LOADING</h3>;
    }

    return (
      <main>
        <header>
          <h1>{this.props.getQuiz.name}</h1>
          <h1>Subject: {this.props.getQuiz.subject}</h1>
          <h1>Room: {this.props.getQuiz.id}</h1>
        </header>
        <section>
          <h3>{this.props.getQuiz.questions[this.state.currentQuestion].question_text}</h3>
          <div>
            {this.props.getQuiz.questions[this.state.currentQuestion].answers.map((answer) => {
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
