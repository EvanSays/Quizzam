import React, { Component } from 'react';
import socket from '../socket';

export default class QuizResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
    };
  }

  render() {
    socket.on('test', (data) => {
      console.log(data);
    });
    console.log(this.props.room);
    return (
      <section>
        hi, I am a quiz result
      </section>
    );
  }
}
