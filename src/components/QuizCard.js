import React from 'react';
import { string, number } from 'prop-types';

const QuizCard = ({ title, questionCount }) => {
  return (
    <section className="quiz-card">
      <h2 className="quiz-card-title">{title}</h2>
      <h2 className="quiz-card-question-count">{questionCount} Questions</h2>
      <button className="quiz-edit-button">Edit Quiz</button>
      <button className="quiz-launch-button">Launch Quiz</button>
    </section>
  );
};

QuizCard.defaultProps = {
  questionCount: 0,
  title: '',
};

QuizCard.propTypes = {
  questionCount: number,
  title: string,
};

export default QuizCard;
