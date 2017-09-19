import React, { Component } from 'react';
import socket from '../socket';

export default class QuizResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
    };
    socket.on('selectAnswer', (data) => {
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
