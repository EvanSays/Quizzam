import React, { Component } from 'react';
import Question from './Question';
import Answer from './Answer';
import PropTypes from 'prop-types';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      quizTitle: '',
      folder: '',
      questions:
      [{
        title: '',
        answers:
          {
            a1: '',
          },
      }],
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(e) {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  // handleAddInput() {
  //   return true
  // }

  renderQuestions() {
    const questionsArray = [];
    const questionLength = this.state.questions.length;

    for (let i = 0; i < questionLength; i += 1) {
      const answersLength = Object.keys(this.state.questions[i].answers).length;
      questionsArray.push(<Question key={Math.random()} id={i} />);

      for (let j = 0; j < answersLength; j += 1) {
        questionsArray.push(<Answer key={Math.random()} id={j} />);
      }
    }
    // console.log(questionsArray);
    return questionsArray;
  }

  addQuestion() {
    const newState = Array.from(this.state.questions);

    newState.push({
      title: '',
      answers:
        {
          a1: '',
        },
    });

    this.setState({ questions: newState });
  }

  render() {
    return (
      <div>
        {this.renderQuestions()}
        <button onClick={() => this.addQuestion()}>Add Question</button>
        <button>Add Answer</button>
      </div>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
