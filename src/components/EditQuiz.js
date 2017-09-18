import React from 'react';
import { getKey } from '../helpers';

const EditQuiz = ({ quizObj, updateAnswer, questionObj, handleUpdateQuestion }) => {
  const questions = quizObj.questions.map((question, index) => {
    const id = question.id;
    return (
      <div key={id}>
        <input
          id={id}
          value={quizObj.questions[index].question_text}
          onChange={e => handleUpdateQuestion(e, id)}
        />
        {
          question.answers.map((answer) => {
            return (
              <div key={answer.id}>
                <input
                  type="radio"
                  id={answer.answer_text}
                  name={answer.answer_text}
                  value={answer.answer_text} />
                <label htmlFor={answer.answer_text}>{answer.answer_text}</label>
              </div>
            );
          })
        }
      </div>
    );
  });

  return (
    <div>
      <h1>{quizObj.name}</h1>
      {questions}
      <button>submit changes</button>
    </div>
  );
};

export default EditQuiz;
