import React from 'react';
import { getKey } from '../helpers';

const EditQuiz = ({ quizObj, updateAnswer, questionObj, handleUpdateQuestion }) => {
  console.log('quizObj', quizObj);
  
  const questions = quizObj.questions.map((question, index) => {
    const id = question.id;
    // console.log('questionObj', questionObj[id].question_text);
    return (
      <div key={getKey()}>
        <input
          id={id}
          data-index={index}
          value='taco'
          onChange={handleUpdateQuestion}
        />
        {
          question.answers.map((answer) => {
            return (
              <div key={getKey()}>
                <input
                  key={answer.id} 
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
      <form action="submit">

      </form>
      <h1>{quizObj.name}</h1>
      {questions}
      <button>submit changes</button>
    </div>
  );
}

export default EditQuiz;
