import React from 'react';
import { func, string } from 'prop-types';

const Answer = ({ id, onChange, value, correct, radioClick }) => {
  const isCorrect = correct === id;

  return (
    <form>
      <input
        id={id}
        onChange={onChange}
        type="text"
        value={value}
      />
      <label htmlFor={id}>
        Correct
        <input
          name={id}
          type="radio"
          checked={isCorrect}
          onClick={(e) => radioClick(e)}
        />
      </label>
    </form>
  );
};

Answer.defaultProps = {
  id: '',
  onChange: () => '',
  value: '',
};

Answer.propTypes = {
  id: string,
  onChange: func,
  value: string,
};

export default Answer;
