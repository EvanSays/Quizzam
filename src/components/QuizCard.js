import React from 'react';
import { string, number } from 'prop-types';

const QuizCard = ({ quizData, postRoom, editQuiz }) => {
  
  const questionCount = quizData.questions.length;

  return (
    <section className="quiz-card">
      <p>{quizData.title}</p>
      <p>{questionCount}</p>
      <button onClick={() => editQuiz(quizData)} 
              className="quiz-edit-button"
              >Edit Quiz
      </button>
      <button className="quiz-delete">Delete Quiz</button>
      <button
        onClick={() => postRoom(quizData)}
        className="quiz-launch-button"
      >Launch Quiz
      </button>
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
