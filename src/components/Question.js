import React, { Component } from 'react';
import { func } from 'prop-types';
import './styles/Question.scss';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question_text: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      correct: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onHandleRadioClick = this.onHandleRadioClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  onHandleRadioClick(event) {
    const { id } = event.target;

    this.setState({ correct: id });
  }

  render() {
    const { handleAddQuestion } = this.props;

    return (
      <section className="question">
        <h1>QUESTION</h1>
        <input
          type="text"
          placeholder="Enter Question"
          name="question_text"
          onChange={this.handleChange}
          value={this.state.question_text}
        />
        <input
          type="text"
          placeholder="Enter Answer"
          name="a1"
          onChange={this.handleChange}
          value={this.state.a1}
        />
        <label htmlFor="a1">
        Correct
          <input
            id="a1"
            type="radio"
            checked={this.state.correct === 'a1'}
            onClick={this.onHandleRadioClick}
          />
        </label>
        <input
          type="text"
          placeholder="Enter Answer"
          name="a2"
          onChange={this.handleChange}
          value={this.state.a2}
        />
        <label htmlFor="a2">
        Correct
          <input
            id="a2"
            type="radio"
            checked={this.state.correct === 'a2'}
            onClick={this.onHandleRadioClick}
          />
        </label>
        <input
          type="text"
          placeholder="Enter Answer"
          name="a3"
          onChange={this.handleChange}
          value={this.state.a3}
        />
        <label htmlFor="a3">
        Correct
          <input
            id="a3"
            type="radio"
            checked={this.state.correct === 'a3'}
            onClick={this.onHandleRadioClick}
          />
        </label>
        <input
          type="text"
          placeholder="Enter Answer"
          name="a4"
          onChange={this.handleChange}
          value={this.state.a4}
        />
        <label htmlFor="a4">
        Correct
          <input
            id="a4"
            type="radio"
            checked={this.state.correct === 'a4'}
            onClick={this.onHandleRadioClick}
          />
        </label>
        <button onClick={() => handleAddQuestion(this.state)}>
        Submit Question
        </button>
      </section>
    );
  }
}

Question.propTypes = {
  addQuestion: func,
};

export default Question;
