import React from 'react';
import PropTypes from 'prop-types';

export const Answer = (props) => {
  const {
    answerKey,
    answerId,
    questionId,
    handleUpdateAnswer,
    answerText,
    handleRadioClick,
    isCorrect,
  } = props;

  return (
    <form>
      <input
        id={answerKey}
        type="text"
        value={answerText}
        onChange={event => handleUpdateAnswer(event, questionId, answerId)}
      />
      <label htmlFor={answerKey}>
          Correct
        <input
          name={answerText}
          type="radio"
          checked={isCorrect}
          onClick={event => handleRadioClick(event, questionId, answerId, answerText)}
        />
      </label>
    </form>
  );
};

Answer.propTypes = {
  answerId: PropTypes.number,
  answerKey: PropTypes.string,
  answerText: PropTypes.string,
  handleRadioClick: PropTypes.func,
  handleUpdateAnswer: PropTypes.func,
  isCorrect: PropTypes.string,
  questionId: PropTypes.string,
};

// export default Answer;
