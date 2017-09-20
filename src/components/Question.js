/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Answer } from './Answer';
import './styles/Question.scss';

export const Question = ({ questionText,
  onHandleUpdateQuestion,
  questionId,
  onHandleAddAnswer,
  answers,
  onHandleUpdateAnswer,
  onHandleRadioClick }) => {
  return (
    <section className="question">
      <h1>QUESTION</h1>
      <div className="question-control-wrapper">
        <input
          className="question-text-input"
          type="text-area"
          value={questionText}
          onChange={event => onHandleUpdateQuestion(event, questionId)}
          placeholder="Enter Question"
        />
        <button
          onClick={event => onHandleAddAnswer(event, questionId)}
          className="create-quiz-btn"
        >Add Answer
        </button>
      </div>
      <div className="answer-container">
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
      </div>
    </section>
  );
};

Question.propTypes = {
  answers: PropTypes.array,
  onHandleAddAnswer: PropTypes.func,
  onHandleRadioClick: PropTypes.func,
  onHandleUpdateAnswer: PropTypes.func,
  onHandleUpdateQuestion: PropTypes.func,
  questionId: PropTypes.number,
  questionText: PropTypes.string,
};
