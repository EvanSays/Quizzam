import React, { Component } from 'react';
import socket from '../socket';

export default class QuizResults extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      quiz: props.quiz,
      results: {},
      users: {},
    };

    this.handleIncomingAnswer = this.handleIncomingAnswer.bind(this);

    socket.on(`${this.props.room}submittedAnswer`, (data) => {
      this.handleIncomingAnswer(data);
    });
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
      <section>
        hi, I am a quiz result
      </section>
    );
  }
}
