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
      questions: [],
      quizId: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  addQuestion(question) {
    const newQuestions = [...this.state.questions, question];
    console.log('addquestion working');
    this.setState({ questions: newQuestions });
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
        <QuestionContainer handleAddQuestion={this.addQuestion} />
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
