import React, { Component } from 'react';
import QuestionContainer from '../containers/QuestionsContainer';
import Answer from './Answer';
import PropTypes from 'prop-types';


class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <section>
        <QuestionContainer />
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
