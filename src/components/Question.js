import React from 'react';

const Question = ({ id, addAnswer }) => {
  return (
    <div>
      <input id={id} type="text" placeholder="Question" />
      <button onClick={() => addAnswer(id)}>Add Answer</button>
    </div>
  );
};

export default Question;
