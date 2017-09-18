import React from 'react';
import { string, number } from 'prop-types';
import play from '../assets/play.svg';
import pencil from '../assets/pencil.svg';
import trash from '../assets/trash.svg';
import './styles/QuizCard.scss';

const QuizCard = ({ quizData, postRoom, editQuiz, deleteQuiz }) => {
  const { name, questions } = quizData;
  const questionCount = questions.length;
  const playBg = { backgroundImage: `url(${play})` };
  const editBg = { backgroundImage: `url(${pencil})` };
  const deleteBg = { backgroundImage: `url(${trash})` };

  return (
    <section className="quiz-card">
      <div className="quiz-card-banner">
        <h2>{name}</h2>
        <button
          style={playBg}
          onClick={() => postRoom(quizData)}
          className="quiz-launch-button"
        />
      </div>
      <div className="quiz-card-info">
        <p>questions: {questionCount}</p>
        <div className="quiz-card-controls">
          <button
            style={editBg}
            onClick={() => editQuiz(quizData)}
            className="quiz-button"
          />
          <button
            style={deleteBg}
            onClick={() => deleteQuiz(quizData.id)}
            className="quiz-button"
          />
        </div>
      </div>
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
