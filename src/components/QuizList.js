import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import QuizCard from './QuizCard';
import { getKey } from '../helpers';
import './styles/QuizList.scss';

class QuizList extends Component {
  constructor() {
    super();
    this.postRoom = this.postRoom.bind(this);
    this.editQuiz = this.editQuiz.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);
    this.state = {
      quizzes: [],
    };
  }

  componentDidMount() {
    const { quizzes } = this.props.selectedFolder;

    this.setState({ quizzes });
  }

  postRoom(quiz) {
    const { createRoom } = this.props;

    createRoom(quiz);
  }

  editQuiz(data) {
    const { selectQuiz, history } = this.props;
    history.push(`/edit/${data.id}`);
    selectQuiz(data);
  }

  deleteQuiz(id) {
    const { deleteQuiz } = this.props;
    const quizzes = this.state.quizzes.filter(quiz => quiz.id !== id);

    deleteQuiz(id);
    this.setState({ quizzes });
  }


  render() {
    const { selectedFolder, selectQuiz, history } = this.props;
    const { name } = selectedFolder;
    const { quizzes } = this.state;

    const quizArray = quizzes.map((quiz) => {
      return (<QuizCard
        key={getKey()}
        quizData={quiz}
        postRoom={this.postRoom}
        editQuiz={this.editQuiz}
        deleteQuiz={this.deleteQuiz}
      />);
    });
    return (
      <section className="quiz-list-wrapper">
        <header className="quiz-list-header">
          <h2>{name}</h2>
          <button onClick={() => history.push('/quiz')}>Create Quiz</button>
        </header>
        <section className="quiz-list">
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
