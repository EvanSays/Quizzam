import React from 'react';
import { string, number } from 'prop-types';

const QuizCard = ({ quizData }) => {
  console.log(quizData);
  const questionCount = quizData.questions.length;
  return (
    <section className="quiz-card">
      <p>{quizData.title}</p>
      <p>{questionCount}</p>
      <button className="quiz-edit-button">Edit Quiz</button>
      <button className="quiz-delete">Delete Quiz</button>
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
