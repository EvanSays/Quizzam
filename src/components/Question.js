import React from 'react';
import { func } from 'prop-types';
import PropTypes from 'prop-types';
import { Answer } from './Answer';

export const Question = ({ questionText, onHandleUpdateQuestion, questionId, onHandleAddAnswer, answers, onHandleUpdateAnswer, onHandleRadioClick }) => {
  return (
    <section className="question">
      <h1>QUESTION</h1>
      <input
        type="text"
        value={questionText}
        onChange={event => onHandleUpdateQuestion(event, questionId)}
        placeholder="Enter Question"
      />
      <button onClick={event => onHandleAddAnswer(event, questionId)}>Add Answer</button>
      {answers.map((answer, index) => {
        return (
          <Answer
            key={index}
            answerKey={answer.key}
            answerId={index}
            questionId={questionId}
            answerText={answer.answer_text}
            onHandleUpdateAnswer={onHandleUpdateAnswer}
            onHandleRadioClick={onHandleRadioClick}
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
