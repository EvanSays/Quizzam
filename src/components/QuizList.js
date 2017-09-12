import React from 'react';
import QuizCard from './QuizCard';
import { quizzes } from './stubs';
import { getKey } from '../helpers';

const QuizList = () => {
  const quizzez = quizzes.map((quiz) => {
    return (<QuizCard
      key={getKey()}
      title={quiz.name}
      questionCount={quiz.questions.length}
    />);
  });
  return (
    <div>
      {quizzez}
    </div>
  );
};

export default QuizList;
