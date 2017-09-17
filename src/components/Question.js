import React, { Component } from 'react';
import { func } from 'prop-types';
import './styles/Question.scss';

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="question">
        <h1>QUESTION</h1>
        <input
          type="text"
          placeholder="Enter Question"
        />
        <input
          type="text"
        />
        <input
          type="text"
        />
        <input
          type="text"
        />
        <input
          type="text"
        />
        <button onClick={this.handleAddQuestion}>Submit Question</button>
      </section>
    );
  }
}

Question.propTypes = {
  addQuestion: func,
};

export default Question;
