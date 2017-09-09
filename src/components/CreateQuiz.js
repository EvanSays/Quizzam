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
            a0: '',
          },
      }],
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
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
      questionsArray.push(<Question key={Math.random()} addAnswer={this.addAnswer} id={i} />);

      for (let j = 0; j < answersLength; j += 1) {
        questionsArray.push(<Answer key={Math.random()} id={j} />);
      }
    }
    // console.log(questionsArray);
    return questionsArray;
  }

  addQuestion() {
    const newState = [...this.state.questions];

    newState.push({
      title: '',
      answers:
        {
          a0: '',
        },
    });

    this.setState({ questions: newState });
  }

  addAnswer(id) {
    const { answers } = this.state.questions[id];
    const answerLength = Object.keys(answers).length;
    const newKey = `a${answerLength}`;
    const newQuestions = [...this.state.questions];

    const newAnswers = Object.assign({}, answers, { [newKey]: '' });

    newQuestions[id].answers = newAnswers;

    this.setState({ questions: newQuestions });
  }

  render() {
    return (
      <div>
        {this.renderQuestions()}
        <button onClick={() => this.addQuestion()}>
          Add Question
        </button>
      </div>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
