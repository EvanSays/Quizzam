import React from 'react';
import EditAnswer from './EditAnswer';

const EditQuestion = ({ question, answers }) => {
  return (
    <div>
      <h2>{question.question_text}</h2>
      <EditAnswer answers={answers} />
    </div>
  )
}

export default EditQuestion;