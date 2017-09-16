import React, { Component } from 'react';
import { getKey } from '../helpers';

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {
      isEditing : false,
      questions : null,
      answers: []
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    const { edit, answers } = this.props
    const answerArray = [];
    const questionArray = [];
    const questions = edit.questions;
    questions.forEach((question) => {
      questionArray.push({ id: question.id, question_text: question.question_text });
      question.answers.forEach((quesAns) => {
        answerArray.push(quesAns);
      });
    });

    this.setState({questions: questionArray, answers: answerArray });
  }
  

  toggleEdit() {
    console.log('toggleEdit');
    
    
  }
  
  render() {
    const { edit } = this.props;

    const questions = edit.questions.map((question) => {
      return (
        <div key={getKey()}>
          <h2>{question.question_text}</h2>
          {
            question.answers.map((answer) => {
              return (
                <div key={getKey()}>
                  <input 
                    type="radio"
                    id={answer.answer_text}
                    name={answer.answer_text}
                    value={answer.answer_text} />
                  <label htmlFor={answer.answer_text}>{answer.answer_text}</label>
                </div>
              )
            })
          }
          <button onClick={this.toggleEdit}>edit question</button>
        </div>
      )
    })

    return (
      <div>
        <h1>{edit.name}</h1>
        {questions}
        <button>submit changes</button>
      </div>
    );
  }
}

export default EditQuiz;
