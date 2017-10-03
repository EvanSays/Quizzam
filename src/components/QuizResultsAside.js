import React from 'react';
import PropTypes from 'prop-types';
import { getKey } from '../helpers';
import './styles/QuizResultsAside.scss';

const QuizResultsAside = ({ onHandleOnClick, quizData, connectedUsers, activeIndex }) => {
  
  const user = connectedUsers.map((str) => {
    return (<div key={getKey()} className="circle green"><p>{str}</p></div>);
  });
  return (
    <aside className="quiz-result-wrapper">
      <h1>{quizData.name}</h1>
      <section className="names">
        <h3>Connected</h3>
        {user}
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
