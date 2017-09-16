import React, { Component } from 'react';
import { func, string } from 'prop-types';

 class Answer extends Component {
  constructor(props) {
    super(props)
     this.state = {
       answer_text: '',
       correct: false
     }
     this.handleChange = this.handleChange.bind(this);
   }

  handleChange(event) {
    this.setState({ answer_text: event.target.value })
  }

  handleRadioClick() {
    this.setState({ correct: !this.state.correct })
  }

  render() {
    return (
      <form>
        <input
          id={id}
          onChange={this.handleChange}
          type="text"
          value={this.state.answer_text}
          />
        <label htmlFor={id}>
          Correct
          <input
            name={id}
            type="radio"
            checked={this.state.correct}
            onClick={e => radioClick(e)}
            />
        </label>
      </form>
    );
  };
  }

Answer.defaultProps = {
  id: '',
  onChange: () => '',
  value: '',
};

Answer.propTypes = {
  id: string,
  onChange: func,
  value: string,
};

export default Answer;
