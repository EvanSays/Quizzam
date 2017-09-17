import React, { Component } from 'react';
import EditQuestion from './EditQuestion';
import { getKey } from '../helpers';

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  
  render() {
    const { editQuizData } = this.props;
    console.log('editQuizData', editQuizData);
    

    return (
      <div>
        <EditQuestion />
      </div>
    );
  }
}

export default EditQuiz;
