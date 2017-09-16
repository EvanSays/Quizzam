import React, { Component } from 'react';
import QuestionContainer from '../containers/QuestionsContainer';
import PropTypes from 'prop-types';


class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      type: '',
      questions: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <section>
        <form>
          <input
            type="text"
            value={this.state.subject}
            placeholder="Quiz Subject"
            name="subject"
            onChange={event => this.handleChange(event)}
          />
          <input
            type="text"
            value={this.state.type}
            placeholder="Quiz Type"
            name="type"
            onChange={event => this.handleChange(event)}
          />
        </form>
        <QuestionContainer />
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
