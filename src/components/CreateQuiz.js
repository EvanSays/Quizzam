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
      quizId: '',
      questions: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, type, subject } = this.state;

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
      .catch(err => console.error(err));
  }

  render() {
    const { quizId } = this.state;
    console.log(this.props);

    if (!quizId) {
      return (
        <form>
          <input
            type="text"
            name="name"
            onChange={this.handleInputChange}
            value={this.state.name}
            placeholder="Quiz Name"
          />
          <input
            type="text"
            name="subject"
            onChange={this.handleInputChange}
            value={this.state.subject}
            placeholder="Quiz Subject"
          />
          <input
            type="text"
            name="type"
            onChange={this.handleInputChange}
            value={this.state.type}
            placeholder="Quiz Type"
          />
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </form>
      );
    }
    return (
      <section>
        <QuestionContainer />
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
