import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuizCard from './QuizCard';
import EditQuiz from './EditQuiz';
import './styles/QuizList.scss';

class QuizList extends Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      quizObj: {},
    };
    this.postRoom = this.postRoom.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    const { quizzes } = this.props.selectedFolder;

    this.setState({ quizzes });
  }

  postRoom(quiz) {
    const { createRoom } = this.props;
    createRoom(quiz);
  }

  toggleEdit(quizObj) {
    this.setState({ isEditing: true, quizObj });
  }

  handleQuestionChange(e, id) {
    const obj = this.state.quizObj;
    const question = obj.questions.filter((el) => {
      return el.id === id;
    });
    question[0].edited = true;
    question[0].question_text = e.target.value;

    this.setState({
      quizObj: obj,
    });
  }

  handleAnswerChange(e, quesId, ansId) {
    const obj = this.state.quizObj;
    const question = obj.questions.filter((el) => {
      return el.id === quesId;
    });

    const answer = question[0].answers.filter((el) => {
      return el.id === ansId;
    });
    answer[0].edited = true;
    answer[0].answer_text = e.target.value;

    this.setState({
      quizObj: obj,
    });
  }

  handleSubmitEdit() {
    const obj = this.state.quizObj;
    const question = obj.questions.filter((el) => {
      return el.edited === true;
    });
    const answer = obj.questions.reduce((acc, el) => {
      const filtered = el.answers.filter((ele) => {
        return ele.edited === true;
      });
      return [...acc, ...filtered];
    }, []);
    this.handleSubmitQuestion(question);
    this.handleSubmitAnswer(answer);
    this.setState({ isEditing: false });
  }

  /* eslint-disable class-methods-use-this */
  handleSubmitQuestion(question) {
    question.forEach((obj) => {
      fetch(`/api/v1/questions/${parseInt(obj.id, 10)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_text: obj.question_text,
        }),
      });
    });
  }

  handleSubmitAnswer(answer) {
    answer.forEach((obj) => {
      fetch(`/api/v1/answers/${parseInt(obj.id, 10)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer_text: obj.answer_text,
        }),
      });
    });
  }
  /* eslint-enable */

  deleteQuiz(id) {
    const { deleteQuiz } = this.props;
    const quizzes = this.state.quizzes.filter(quiz => quiz.id !== id);

    deleteQuiz(id);
    this.setState({ quizzes });
  }

  render() {
    const { selectedFolder, history } = this.props;
    const { quizObj, answerArray } = this.state;
    const { name, quizzes } = selectedFolder;
    if (this.state.isEditing) {
      return (
        <div className="edit-quiz-container">
          <h1 className="edit-quiz-header">Edit Quiz</h1>
          <EditQuiz
            updateQuestion={this.updateQuestion}
            updateAnswer={this.updateAnswer}
            onHandleQuestionChange={this.handleQuestionChange}
            onHandleAnswerChange={this.handleAnswerChange}
            onHandleSubmitEdit={this.handleSubmitEdit}
            quizObj={quizObj}
            answerArray={answerArray}
          />
        </div>
      );
    }
    const quizArray = quizzes.map((quiz) => {
      return (
        <div key={quiz.id} className="quiz-card-wrapper">
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
          <button
            className="quiz-list-create-quiz"
            onClick={() => history.push('/quiz')}
          >Create Quiz
          </button>
        </header>
        <section className="quiz-list">
          {quizArray}
        </section>
      </section>
    );
  }
}

QuizList.propTypes = {
  createRoom: PropTypes.func,
  deleteQuiz: PropTypes.func,
  history: PropTypes.object,
  selectedFolder: PropTypes.object,
};

export default QuizList;
