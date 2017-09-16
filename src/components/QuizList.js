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
    this.scrubSelectedQuiz(quizData);
  }

  scrubSelectedQuiz(quizData) {
    const answerArray = [];
    const questionArray = [];
    const questions = quizData.questions;

    questions.forEach((question) => {
      questionArray.push({ id: question.id, question_text: question.question_text });
      question.answers.forEach((quesAns) => {
        answerArray.push(quesAns);
      });
    });
    console.log('questionsArray, answersArray', questionArray, answerArray);
  }

  deleteQuiz(id) {
    const { deleteQuiz } = this.props;
    const quizzes = this.state.quizzes.filter(quiz => quiz.id !== id);

    deleteQuiz(id);
    this.setState({ quizzes });
  }


  render() {
    const { selectedFolder, selectQuiz, history } = this.props;
    const { quizObj } = this.state;
    const { name, quizzes } = selectedFolder;
    if (this.state.isEditing) {
      return(
        <div key={getKey()}>
          <h1>edit quiz</h1>
          <EditQuiz quizObj={quizObj}/>
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
