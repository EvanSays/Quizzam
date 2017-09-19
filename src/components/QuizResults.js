import React, { Component } from 'react';
import ResultsChart from './ResultsChart';
import QuizResultsAside from './QuizResultsAside';
import socket from '../socket';

export default class QuizResults extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      quiz: props.quiz,
      results: {},
      users: {},
      answerKey: [],
    };

    this.handleIncomingAnswer = this.handleIncomingAnswer.bind(this);

    socket.on(`${this.props.room}submittedAnswer`, (data) => {
      this.handleIncomingAnswer(data);
    });
  }

  componentDidMount() {
    this.answerKeyGenerator(this.state.quiz);
  }

  answerKeyGenerator(obj) {
    const answerKey = [];

    obj.questions.map((answer) => {
      return answer.answers.map((correct) => {
        return correct.correct ? answerKey.push(correct.id.toString()) : null;
      });
    });
    return this.setState({ answerKey });
  }

  handleIncomingAnswer(answerObj) {
    const { answer, name, questionId } = answerObj;
    const newState = Object.assign({}, this.state.users);

    if (!newState[name]) {
      newState[name] = { [questionId]: answer };
    } else {
      newState[name] = Object.assign(newState[name], { [questionId]: answer });
    }

    this.setState({ users: newState });
  }

  render() {
    return (
      <section className="quiz-results">
        <ResultsChart />
        <QuizResultsAside />
      </section>
    );
  }
}
