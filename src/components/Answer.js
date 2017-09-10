import React from 'react';
import { func, string } from 'prop-types';

const Answer = ({ id, onChange, value }) => {
  return (
    <form>
      <input
        id={id}
        onChange={onChange}
        type="text"
        value={value}
      />
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
