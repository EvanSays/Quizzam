import React from 'react';
import PropTypes from 'prop-types';
import './styles/Answer.scss';

export const Answer = (props) => {
  const {
    answerKey,
    answerId,
    questionId,
    onHandleUpdateAnswer,
    answerText,
    onHandleRadioClick,
    isCorrect,
  } = props;

  return (
    <form>
      <input
        className="answer-text-input"
        id={answerKey}
        type="text"
        value={answerText}
        onChange={event => onHandleUpdateAnswer(event, questionId, answerId)}
      />
      <label htmlFor={answerKey}>
          Correct
        <input
          className="answer-radio"
          name={answerText}
          type="radio"
          checked={isCorrect}
          onClick={event => onHandleRadioClick(event, questionId, answerId, answerText)}
        />
      </label>
    </form>
  );
};

Answer.propTypes = {
  answerId: PropTypes.number,
  answerKey: PropTypes.number,
  answerText: PropTypes.string,
  isCorrect: PropTypes.bool,
  onHandleRadioClick: PropTypes.func,
  onHandleUpdateAnswer: PropTypes.func,
  questionId: PropTypes.number,
};
