import React, { Component } from 'react';
import QuestionContainer from '../containers/QuestionsContainer';
import PropTypes from 'prop-types';


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
      }],
      quizId: '',
    };
    this.updateAnswer = this.updateAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  updateQuestion(id, questionUpdate) {
    const newState = [...this.state.questions];

    newState[id] = questionUpdate;

    this.setState({ questions: newState });
  }

  updateAnswer(questionId, answerId, answerUpdate) {
    const newState = [...this.state.questions];

    newState[questionId].answers[answerId] = answerUpdate;
    this.setState({ questions: newState });
    forceUpdate();
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  addQuestion() {
    const question = {
      question_text: '',
      answers: [],
    };

    const newQuestions = [...this.state.questions, question];
    this.setState({ questions: newQuestions });
  }

  addAnswer(questionId) {
    const questions = [...this.state.questions];
    const answer = {
      answer_text: '',
      correct: false,
    };
    const newAnswers = [...questions[questionId].answers, answer];

    const newState = questions[questionId].answers = newAnswers;

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
      .then(data => this.setState({ quizId: data.id }))
      .catch(err => console.log(err));
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
        <button onClick={this.addQuestion}>Add Question</button>

        {this.state.questions.map((question, index) => {
          return (<QuestionContainer
            key={question.questionText}
            updateQuestion={this.updateQuestion}
            updateAnswer={this.updateAnswer}
            id={index}
            questionText={question.question_text}
            answers={question.answers}
            addAnswer={this.addAnswer}
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
