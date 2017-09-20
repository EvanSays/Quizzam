import React, { Component } from 'react';
// import QuestionContainer from '../containers/QuestionsContainer';
import PropTypes from 'prop-types';
import { Question } from '../components/Question';
import { getKey } from '../helpers';


class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      subject: '',
      type: '',
      questions: [{
        question_text: '',
        answers: [],
        key: getKey(),
      }],
      quizId: '',
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleUpdateQuestion = this.handleUpdateQuestion.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleSubmitNewQuiz = this.submitNewQuiz.bind(this);
  }

  submitNewQuiz() {
    const { questions, quizId } = this.state;

    return Promise.all(questions.map((question) => {
      return fetch(`/api/v1/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_text: question.question_text,
          quiz_id: quizId,
        }),
      });
    }))
      .then((response) => {
        return response[0].json();
      })
      .then((questionIds) => {
        for (let i = 0; i < questions.length; i += 1) {
          Promise.all(questions[i].answers.map((answer) => {
            fetch(`/api/v1/questions/${questionIds.id[i]}/answers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                question_id: questionIds.id[i],
                answer_text: answer.answer_text,
                correct: answer.correct,
              }),
            });
          }))
            .catch(error => console.log(error));
        }
      })
      .then(() => this.props.fetchFolders(this.props.selectedFolder.user_id))
      .catch(error => error);
  }

  handleUpdateQuestion(event, questionId) {
    const newState = [...this.state.questions];
    const key = getKey();

    const questionUpdate = {
      question_text: event.target.value,
      answers: [...newState[questionId].answers],
      key,
    };

    newState[questionId] = questionUpdate;

    this.setState({ questions: newState });
  }

  handleUpdateAnswer(event, questionId, answerId) {
    const newState = [...this.state.questions];

    const answerUpdate = {
      answer_text: event.target.value,
      correct: false,
    };

    newState[questionId].answers[answerId] = answerUpdate;
    this.setState({ questions: newState });
  }

  handleRadioClick(event, questionId, answerId) {
    const newState = [...this.state.questions];
    const isCorrect = !newState[questionId].answers[answerId].correct;

    const answerUpdate = {
      answer_text: newState[questionId].answers[answerId].answer_text,
      correct: isCorrect,
    };

    newState[questionId].answers[answerId] = answerUpdate;
    this.setState({ questions: newState });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleAddQuestion() {
    const key = getKey();
    const question = {
      question_text: '',
      answers: [],
      key,
    };

    const newState = [...this.state.questions, question];
    this.setState({ questions: newState });
  }

  handleAddAnswer(event, questionId) {
    const questions = [...this.state.questions];
    const key = getKey();
    const answer = {
      answer_text: '',
      correct: false,
      key,
    };
    const newAnswers = [...questions[questionId].answers, answer];
    questions[questionId].answers = newAnswers;

    this.setState({ questions });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, subject, type } = this.state;
    const { user_id, id } = this.props.selectedFolder;

    fetch('/api/v1/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        subject,
        type,
        user_id,
        folder_id: id,
      }),
    })
      .then(blob => blob.json())
      .then((data) => {
        this.setState({ quizId: data.id });
      })
      .catch(err => err);
  }

  render() {
    if (!this.state.quizId) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            placeholder="Quiz Name"
            name="name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.subject}
            placeholder="Quiz Subject"
            name="subject"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.type}
            placeholder="Quiz Type"
            name="type"
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Submit New Quiz"
          />
        </form>
      );
    }
    return (
      <section>
        <button onClick={this.handleAddQuestion}>Add Question</button>
        <button onClick={this.handleSubmitNewQuiz}>Save Quiz</button>

        {this.state.questions.map((question, index) => {
          return (<Question
            key={index}
            onHandleUpdateQuestion={this.handleUpdateQuestion}
            onHandleUpdateAnswer={this.handleUpdateAnswer}
            questionId={index}
            questionText={question.question_text}
            answers={question.answers}
            onHandleAddAnswer={this.handleAddAnswer}
            onHandleRadioClick={this.handleRadioClick}
          />
          );
        })}
      </section>
    );
  }
}

CreateQuiz.propTypes = {
  fetchFolders: PropTypes.func,
  selectedFolder: PropTypes.func,
};

export default CreateQuiz;
