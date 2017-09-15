import React from 'react';
import QuizCard from './QuizCard';
// import { quizzes } from './stubs';
import { getKey } from '../helpers';
import './styles/QuizList.scss';

const QuizList = ({ selectedFolder, selectQuiz }) => {
  // console.log('this.props', this.props);
  
  const { name, quizzes } = selectedFolder;
  const quizArray = quizzes.map((quiz) => {
    return <QuizCard key={getKey()} quizData={quiz} selectedQuiz={selectQuiz} />;
  });

  return (
    <section className="quiz-list">
      <header>
        <h2>{name}</h2>
        <button>Create Quiz</button>
      </header>
      <section>
        {quizArray}
      </section>
    </section>
  );
};

// QuizList.defaultProps = {
//
// };
//
// QuizList.propTypes = {
//   id: string,
//   onChange: func,
//   value: string,
// };

export default QuizList;
