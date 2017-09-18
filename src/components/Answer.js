import React from 'react';
import { func, string } from 'prop-types';

export const Answer = ({ answerKey, answerId, questionId, handleUpdateAnswer, answerText, handleRadioClick, isCorrect }) => {
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

// Answer.defaultProps = {
//   id: '',
//   onChange: () => '',
//   value: '',
// };
//
// Answer.propTypes = {
//   id: string,
//   onChange: func,
//   value: string,
// };

// export default Answer;
