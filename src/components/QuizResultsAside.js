import React from 'react';
import { getKey } from '../helpers';
import './styles/QuizResultsAside.scss';

const QuizResultsAside = ({ handleOnClick, quizData }) => {
  const question = quizData.questions.map((quesObj, index) => {
    return (
      <button
        key={getKey()}
        onClick={handleOnClick}
      >Q{index + 1}<span>25%</span>
      </button>);
  });
  return (
    <aside className="quiz-result-wrapper">
      <h1>Quiz Name</h1>
      <section className="names">
        <h3>Connected</h3>
        <div className="circle red"><p>Juan</p></div>
        <div className="circle red"><p>James</p></div>
        <div className="circle green"><p>George</p></div>
      </section>
      <section className="questions">
        <div className="header">
          <h3>All Questions</h3>
          <p>sort</p>
        </div>
        {question}
      </section>
    </aside>
  );
};

export default QuizResultsAside;
