import React from 'react';
import { func } from 'prop-types';
import PropTypes from 'prop-types';
import { Answer } from './Answer';

export const Question = ({ questionText, handleUpdateQuestion, questionId, handleAddAnswer, answers, handleUpdateAnswer, handleRadioClick }) => {
  return (
    <section className="question">
      <h1>QUESTION</h1>
      <input
        type="text"
        value={questionText}
        onChange={event => handleUpdateQuestion(event, questionId)}
        placeholder="Enter Question"
      />
      <button onClick={event => handleAddAnswer(event, questionId)}>Add Answer</button>
      {answers.map((answer, index) => {
        return (
          <Answer
            answerKey={answer.key}
            answerId={index}
            questionId={questionId}
            answerText={answer.answer_text}
            handleUpdateAnswer={handleUpdateAnswer}
            handleRadioClick={handleRadioClick}
            isCorrect={answer.correct}
          />
        );
      })}
    </section>
  );
};

// Question.propTypes = {
//   addQuestion: func,
// };
