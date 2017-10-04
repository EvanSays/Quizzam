import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getKey } from '../helpers';
import flash from '../assets/flash.svg';
import './styles/QuizResultsAside.scss';

const QuizResultsAside = ({ onHandleOnClick, quizData, connectedUsers, activeIndex }) => {
  const logo = { backgroundImage: `url(${flash})` };
  
  const user = connectedUsers.map((str) => {
    return (<div key={getKey()} className="circle green"><p>{str}</p></div>);
  });
  return (
    <aside className="quiz-result-wrapper">
      <Link to="/" className="welcome-logo-ink">
        <div style={logo} className="welcome-logo" />
      </Link>
      <h1>{quizData.name}</h1>
      <section className="names">
        <h3>Connected</h3>
        <div className="users">
          {user}
        </div>
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
