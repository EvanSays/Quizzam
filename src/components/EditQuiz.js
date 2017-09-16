import React, { Component } from 'react';
import { getKey } from '../helpers';

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  
  render() {
    const { edit } = this.props;

    const questions = edit.questions.map(question => {
      console.log('question', question);
      
      return (
        <div key={getKey()}>
          <h2>{question.question_text}</h2>
          {
            question.answers.map((answer, index) => {
              console.log('answer', answer);
              
              return (
                <div key={getKey()}>
                  <input type="radio"
                    id={answer.answer_text}
                    name={answer.answer_text}
                    value={answer.answer_text} />
                  <label htmlFor>{answer.answer_text}</label>
                </div>
              )
            })
          }
        </div>
      )
    })

    return (
      <div>
        <h1>{edit.name}</h1>
        {questions}
      </div>
    );
  }
}

export default EditQuiz;