import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import QuizCard from './QuizCard';
import EditQuiz from './EditQuiz';
import { getKey } from '../helpers';
import './styles/QuizList.scss';

class QuizList extends Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      quizObj: {},
      questionObj: {},
    };
    this.postRoom = this.postRoom.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);
  }

  componentDidMount() {
    const { quizzes } = this.props.selectedFolder;

    this.setState({ quizzes });
  }

  postRoom(quiz) {
    const { createRoom } = this.props;

    createRoom(quiz);
  }

  toggleEdit(quizData) {
    const { quizObj } = this.state;
    this.setState({ isEditing: true, quizObj: quizData });
  }

  handleUpdateQuestion(e) {

  }

  deleteQuiz(id) {
    const { deleteQuiz } = this.props;
    const quizzes = this.state.quizzes.filter(quiz => quiz.id !== id);

    deleteQuiz(id);
    this.setState({ quizzes });
  }


  render() {
    const { selectedFolder } = this.props;
    const { quizObj, questionObj, answerArray } = this.state;
    const { name, quizzes } = selectedFolder;
    if (this.state.isEditing) {
      return(
        <div key={getKey()}>
          <h1>edit quiz</h1>
          <EditQuiz 
          quizObj={quizObj}
          updateQuestion={this.updateQuestion}
          updateAnswer={this.updateAnswer}
          questionObj={questionObj}
          answerArray={answerArray}
          handleUpdateQuestion={this.handleUpdateQuestion}
          />
        </div>
      )
    }
    const quizArray = quizzes.map((quiz) => {
      return (
        <div key={getKey()}>
          <h2>{name}</h2>
          <QuizCard
            key={getKey()}
            quizData={quiz}
            postRoom={this.postRoom}
            toggleEdit={this.toggleEdit}
            deleteQuiz={this.deleteQuiz}
          />
        </div>
        );
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
