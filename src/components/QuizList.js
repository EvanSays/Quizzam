import React, { Component } from 'react';
import QuizCard from './QuizCard';
import { getKey } from '../helpers';
import './styles/QuizList.scss';

class QuizList extends Component {
  constructor() {
    super();

    this.postRoom = this.postRoom.bind(this);
    this.editQuiz = this.editQuiz.bind(this);
  }

  postRoom(id) {
    const { createRoom, history } = this.props;
    createRoom(id);
    history.push(`/room/${id}`);
  }

  editQuiz(data) {
    const { selectQuiz, history } = this.props;
    console.log('data', data);
    history.push(`/edit/${data.id}`);
    selectQuiz(data);
  }

  render() {
    const { selectedFolder, selectQuiz } = this.props;
    const { name, quizzes } = selectedFolder;
    const quizArray = quizzes.map((quiz) => {
      return (<QuizCard
        key={getKey()}
        quizData={quiz}
        postRoom={this.postRoom}
        editQuiz={this.editQuiz}
      />);
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
  }
}

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
