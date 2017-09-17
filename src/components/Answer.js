import React, { Component } from 'react';
import { func, string } from 'prop-types';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      questionId: this.props.questionId,
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
  }

 componentWillReceiveProps(nextProps) {
    console.log(nextProps);
   }

  handleUpdateAnswer(event) {
    const answer = {
      answer_text: event.target.value,
      correct: false,
    };

    this.props.updateAnswer(this.state.questionId, this.state.id, answer);
  }

  // handleChange(event) {
  //   this.setState({ answer_text: event.target.value });
  // }
  // 
  // handleRadioClick() {
  //   this.setState({ correct: !this.state.correct });
  // }
  // 
  // handleSubmit(event) {
  //   event.preventDefault();
  //   const { addAnswer } = this.props;
  // 
  //   addAnswer(this.state);
  // }
  // onChange={this.handleChange}
  // onClick={this.handleRadioClick}
  // <button onClick={this.handleSubmit}>Submit</button>

  render() {
    console.log(this.props.answerText);
    return (
      <form>
        <input
          id={this.state.id}
          type="text"
          value={this.props.answerText}
          onChange={this.handleUpdateAnswer}
        />
        <label htmlFor={this.props.id}>
          Correct
          <input
            name={this.state.id}
            type="radio"
            checked={false}
          />
        </label>
      </form>
    );
  }
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
