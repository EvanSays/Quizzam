import EditQuestion from './EditQuestion'
import React, { Component } from 'react';

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
      
        return <EditQuestion question={question} answers={question.answers} />
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
