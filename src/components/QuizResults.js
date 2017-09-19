import React, { Component } from 'react';
import socket from '../socket';

export default class QuizResults extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      quiz: props.quiz,
      results: {},
    };
    socket.on(`${this.props.room}submittedAnswer`, (data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <section>
        hi, I am a quiz result
      </section>
    );
  }
}
