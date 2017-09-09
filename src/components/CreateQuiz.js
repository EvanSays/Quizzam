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
      question: '',
      answer: ''
    };

    this.renderQuestions = this.renderQuestions.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this)
  }

  renderQuestions() {
    const questionsArray = [];
    const questionLength = this.state.questions.length;
    

    for (let i = 0; i < questionLength; i += 1) {
      const answersLength = Object.keys(this.state.questions[i].answers).length;
      questionsArray.push(<Question key={Math.random()} 
                                    handleQuestionInput={this.handleQuestionInput} 
                                    addAnswer={this.addAnswer} 
                                    value={this.state.questions[i].title}
                                    id={i} />);

      for (let j = 0; j < answersLength; j += 1) {
        questionsArray.push(<Answer key={Math.random()} id={j} />);
      }
    }
    return questionsArray;
  }

  handleQuestionInput(e) {
    console.log(e.target.name);
    
    const newQuestions = [...this.state.questions];

    newQuestions[e.target.id].title = e.target.value

    const title = this.state.questions[0].title
    
    this.setState({
      questions: newQuestions
    });
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
        <Question />
      </div>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
