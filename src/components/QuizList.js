import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import QuizCard from './QuizCard';
import EditQuiz from './EditQuiz';
import { getKey } from '../helpers';
import './styles/QuizList.scss';

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      selectedQuiz: this.props.editQuizData,
      quizName: '',
    };
    this.postRoom = this.postRoom.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editQuizData !== nextProps.editQuizData) {
      this.setState({ selectedQuiz: nextProps.editQuizData });
    }
  }

  postRoom(quiz) {
    const { createRoom } = this.props;
    createRoom(quiz);
  }

  toggleEdit(quizData) {
    const { selectQuiz } = this.props;
    selectQuiz(quizData);
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const { selectedFolder, history, editQuizData } = this.props;
    const { name, quizzes } = selectedFolder;

    if(this.state.isEditing) {
      return (
        <div>
          <EditQuiz editQuizData={editQuizData} />
        </div>
      )
    }
    const quizArray = quizzes.map((quiz) => {
      return (<QuizCard
        key={getKey()}
        quizData={quiz}
        postRoom={this.postRoom}
        editQuiz={this.editQuiz}
        toggleEdit={this.toggleEdit}
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
