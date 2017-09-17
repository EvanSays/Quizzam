import React, { Component } from 'react';
import { func } from 'prop-types';
import './styles/Question.scss';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a1: '',
      a2: '',
      a3: '',
      a4: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { onAnswerChange, index, giveValue } = this.props;
    console.log(this.props);

    return (
      <section className="question">
        <h1>QUESTION</h1>
        <input
          type="text"
          placeholder="Enter Question"
        />
        <input
          type="text"
          placeholder="Enter Answer"
          name="a1"
          onChange={this.handleChange}
          value={this.state.a1}
        />
        <input
          type="text"
          placeholder="Enter Answer"
          name="a2"
          onChange={this.handleChange}
          value={this.state.a2}
        />
        <input
          type="text"
          placeholder="Enter Answer"
          name="a3"
          onChange={this.handleChange}
          value={this.state.a3}
        />
        <input
          type="text"
          placeholder="Enter Answer"
          name="a4"
          onChange={this.handleChange}
          value={this.state.a4}
        />
        <button onClick={this.handleAddQuestion}>Submit Question</button>
      </section>
    );
  }
}

Question.propTypes = {
  addQuestion: func,
};

export default Question;
