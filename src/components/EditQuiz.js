import React, { Component } from 'react';
import { getKey } from '../helpers';

const EditQuiz = ({ quizObj, updateQuestion, updateAnswer }) => {
  const questions = quizObj.questions.map((question) => {
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
      </div>
    )
  })

  return (
    <div>
      <h1>{quizObj.name}</h1>
      {questions}
      <button>submit changes</button>
    </div>
  );
}

export default EditQuiz;
