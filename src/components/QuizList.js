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
    };
    this.postRoom = this.postRoom.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      isEditing: false,
      quizObj: {},
    };
    this.postRoom = this.postRoom.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);
    this.handleUpdateQuestion = this.handleUpdateQuestion.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
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

  handleUpdateQuestion(e, id) {
    const obj = this.state.quizObj;

    const question = obj.questions.filter((array) => {
      return array.id === id;
    });
    question[0].edited = true;
    question[0].question_text = e.target.value;
    this.setState({ quizObj: obj });
  }

  handleUpdateAnswer(e, quesId, ansId) {
    const obj = this.state.quizObj;
    const question = obj.questions.filter((array) => {
      return array.id === quesId;
    });

    const answer = question[0].answers.filter((array) => {
      return array.id === ansId;
    });
    answer[0].edited = true;
    answer[0].answer_text = e.target.value;
    this.setState({ quizObj: obj });
  }

  deleteQuiz(id) {
    const { deleteQuiz } = this.props;
    const quizzes = this.state.quizzes.filter(quiz => quiz.id !== id);

    deleteQuiz(id);
    this.setState({ quizzes });
  }

  render() {
    const { selectedFolder, history } = this.props;
    const { quizObj, questionObj, answerArray } = this.state;
    const { name, quizzes } = selectedFolder;
    if (this.state.isEditing) {
      return (
        <div>
          <h1>edit quiz</h1>
          <EditQuiz
            updateQuestion={this.updateQuestion}
            updateAnswer={this.updateAnswer}
            handleUpdateQuestion={this.handleUpdateQuestion}
            handleUpdateAnswer={this.handleUpdateAnswer}
            quizObj={quizObj}
            answerArray={answerArray}
          />
        </div>
      );
    }
    const quizArray = quizzes.map((quiz) => {
      return (
        <div key={quiz.id}>
          <h2>{name}</h2>
          <QuizCard
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
