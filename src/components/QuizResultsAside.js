import React from 'react';
import PropTypes from 'prop-types';
import { getKey } from '../helpers';
import './styles/QuizResultsAside.scss';

const QuizResultsAside = ({ onHandleOnClick, quizData, connectedUsers, activeIndex }) => {
  const user = connectedUsers.map((str) => {
    return (<div key={getKey()} className="circle green"><p>{str}</p></div>);
  });
  const question = quizData.questions.map((quesObj, index) => {
    return (
      <button
        key={getKey()}
        className={activeIndex !== index ? null : 'active'}
        onClick={() => onHandleOnClick(quesObj, index)}
      >Q{index + 1}<span>25%</span>
      </button>);
  });
  return (
    <aside className="quiz-result-wrapper">
      <h1>Quiz Name</h1>
      <section className="names">
        <h3>Connected</h3>
        {user}
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

QuizResultsAside.propTypes = {
  activeIndex: PropTypes.number,
  connectedUsers: PropTypes.array,
  onHandleOnClick: PropTypes.func,
  quizData: PropTypes.object,
};

export default QuizResultsAside;
