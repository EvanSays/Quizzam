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
      [
        {
          title: '',
          answers:
          {
            a1: '',
          }
        },
        {
          title: '',
          answers:
          {
            a1: '',
          }
        }
      ]
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  renderQuestions() {
    let questionsArray = [];
    let questionLength = this.state.questions.length;
    
    
    for (let i = 0; i < questionLength; i++) {
      let answersLength = Object.keys(this.state.questions[i].answers).length
      questionsArray.push(<Question id={i} key={Math.random()} />)

      for (let j = 0; j < answersLength; j++) {
        questionsArray.push(<Answer id={j} key={Math.random()} />)
      }
    }
    console.log(questionsArray)
    return questionsArray
  }

  handleInputChange(e) {
    const target = e.target;
    const value = e.target.value
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleAddInput() {

  }


  render() {
    return (
      <div>
        {this.renderQuestions()}
        
        {/* <input type="text"
               name="quizTitle"
               placeholder="Quiz title"
               onChange={this.handleInputChange}/> 
        <input type="text"
               name="question"
               placeholder="Question Name"
               onChange={this.handleInputChange}/>
        <input type="text" 
               name="answer"
               placeholder="Answer1"
               onChange={this.handleInputChange}/>
        <button>New Question</button>  */}

      </div>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;