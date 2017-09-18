import React, { Component } from 'react';
import { object, array, string, func } from 'prop-types';
import './styles/TakeQuiz.scss';
import { questionTypes } from '../helpers';
import socket from '../socket';

function initializeState(quiz) {
  const initialState = [];
  for (let i = 0; i < quiz.questions.length; i += 1) {
    initialState.push({ selectedAnswers: [] });
  }
  return initialState;
}

export default class TakeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      answers: initializeState(this.props.quiz),
    };

    socket.on('test', (data) => {
      console.log(data);
    });

    this.handleClick = this.handleClick.bind(this);
    this.determineInputType = this.determineInputType.bind(this);
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
    this.sendSocket = this.sendSocket.bind(this);
  }

  sendSocket() {
    socket.emit('test', this.state)
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
    const prevState = this.state.answers[this.state.currentQuestion].selectedAnswers;
    const newAnswer = event.target.id.charAt(event.target.id.length - 1);

    if (prevState.find(element => newAnswer === element)) {
      const currentAnswers = prevState.filter(answer => newAnswer !== answer);
      const newState = [...this.state.answers];

      newState[this.state.currentQuestion] = currentAnswers;
      this.setState({ answers: newState });
    } else if (event.target.type === 'checkbox') {
      const newState = [...this.state.answers];

      newState[this.state.currentQuestion] = { selectedAnswers: [...prevState, newAnswer] };
      this.setState({ answers: newState });
    } else if (event.target.type === 'radio') {
      const newState = [...this.state.answers];

      newState[this.state.currentQuestion] = { selectedAnswers: [newAnswer] };
      this.setState({ answers: newState });
    }
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
              checked={this.state.answers[this.state.currentQuestion].selectedAnswers.find(element => element == answer.id)}
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
              checked={this.state.answers[this.state.currentQuestion].selectedAnswers.find(element => element == answer.id)}
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
          <button onClick={this.sendSocket}>Click</button>
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
