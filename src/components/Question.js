import React, { Component } from 'react';
import { func } from 'prop-types';
import { getKey } from '../helpers';
import PropTypes from 'prop-types';

import Answer from './Answer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    };
    this.handleUpdateQuestion = this.handleUpdateQuestion.bind(this);
    // this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleAddNewAnswer = this.handleAddNewAnswer.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
  }

  handleUpdateQuestion(event) {
    const newQuestionInfo = {
      question_text: event.target.value,
      answers: this.props.answers,
    };
    const id = this.state.id;
    this.props.updateQuestion(id, newQuestionInfo);
  }


  handleAddNewAnswer() {
    const answers = Object.assign({}, this.state.answers, { [getKey()]: '' });

    this.setState({ answers });
  }

  handleOnChange(e) {
    const answers = this.state.answers;

    answers[e.target.id] = e.target.value;
    this.setState({ answers });
  }

  // handleAddQuestion() {
  //   const { addQuestion } = this.props;
  //   const { question_text } = this.state;
  //   const { answers } = this.state;
  //
  //   addQuestion({ question_text, answers });
  // }

  // handleSubmit() {
  //   const { handleAddQuestion } = this.props;
  // 
  //   handleAddQuestion(this.state);
  // }

  handleRadioClick(event) {
    const { name } = event.target;
    this.setState({ correct: name });
  }

  handleAddAnswer(event) {
    event.preventDefault();
    this.props.addAnswer(this.state.id);
  }
  //   return (
  //     <Answer
  //       key={answer}
  //       id={answer}
  //       onChange={this.handleOnChange}
  //       value={this.state.answers[answer]}
  //       correct={this.state.correct}
  //       radioClick={this.handleRadioClick}
  //       addAnswer={this.addAnswer}
  //       />
  //   );
  // });
  // const answers = Object.keys(this.state.answers).map((answer) => {
  // }
  // {answers}

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return true;
  }

  render() {
    return (
      <section className="question">
        <h1>QUESTION</h1>
        <input
          id={this.state.id}
          type="text"
          value={this.props.questionText}
          onChange={this.handleUpdateQuestion}
          placeholder="Enter Question"
        />
        <button onClick={this.handleAddAnswer}>Add Answer</button>
        {this.props.answers.map((answer, index) => {
          return (<Answer
            id={index}
            questionId={this.state.id}
            answerText={answer.answer_text}
            updateAnswer={this.props.updateAnswer}
          />);
        })}
      </section>
    );
  }
}

Question.propTypes = {
  addQuestion: func,
};

export default Question;
