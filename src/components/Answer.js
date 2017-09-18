import React from 'react';
import { func, string } from 'prop-types';

export const Answer = ({ key, answerId, questionId, handleUpdateAnswer, answerText }) => {
  return (
    <form key={key}>
      <input
        id={key}
        type="text"
        value={answerText}
        onChange={event => handleUpdateAnswer(event, questionId, answerId)}
      />
      <label htmlFor={key}>
          Correct
        <input
          name={answerText}
          type="radio"
          checked={false}
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
