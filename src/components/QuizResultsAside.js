import React from 'react';
import './styles/QuizResultsAside.scss';

const QuizResultsAside = () => {
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
        <button>Q1<span>25%</span></button>
        <button>Q2<span>5%</span></button>
        <button>Q3<span>90%</span></button>
        <button>Q4<span>95%</span></button>
        <button>Q5<span>100%</span></button>
      </section>
    </aside>
  );
};

export default QuizResultsAside;