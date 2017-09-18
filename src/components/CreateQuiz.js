import React, { Component } from 'react';
// import QuestionContainer from '../containers/QuestionsContainer';
import { Question } from '../components/Question';
import PropTypes from 'prop-types';
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

  handleRadioClick(event, questionId, answerId, answerText) {
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

    fetch('/api/v1/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        subject,
        type,
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

        {this.state.questions.map((question, index) => {
          return (<Question
            handleUpdateQuestion={this.handleUpdateQuestion}
            handleUpdateAnswer={this.handleUpdateAnswer}
            questionId={index}
            questionText={question.question_text}
            answers={question.answers}
            handleAddAnswer={this.handleAddAnswer}
            handleRadioClick={this.handleRadioClick}
          />
          );
        })}
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
