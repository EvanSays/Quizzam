import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      answers: {
        a0: ''
      }
    };
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const length = Object.keys(this.state.answers).length;
  //   const newLength = Object.keys(nextState.answers).length;
  //   const answers = this.state.answers;
  //   const nextAnswers = nextState.answers

  //   if (length === newLength && answers) {
  //     return false
  //   } else {
  //     return true
  //   }
    
  // }

  handleQuestionInput(e) {
    console.log('handlequestion input')
    console.log(e.target.value)
    this.setState({
      title : e.target.value
    })
  }

  addAnswer() {
    const count = Object.keys(this.state.answers).length;
    const newObj = Object.assign({}, this.state.answers, {[`a${count}`]: ''})

    this.setState({
      answers: newObj
    })
  }

  handleChange(e){
    console.log(e.target.id);
    const answers = this.state.answers
    answers[e.target.id] = e.target.value

    this.setState({
      answers
    })
  }

  renderAnswers() {
    const answers = Object.keys(this.state.answers).length;
    let answerArray = [];
    // console.log(answers);

    for(let i = 0; i < answers; i++) {
      answerArray.push(<Answer 
                        id={`a${i}`}
                        key={Math.random()}
                        value={this.state.answers[`a${i}`]}
                        handleChange={this.handleChange}
                        />)
    }
    return answerArray
  }

  render() {
    return (
      <div>
        <h1>QUESTION</h1>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleQuestionInput}
          placeholder="Question" />
        {this.renderAnswers()}
        <button onClick={this.addAnswer}>Add Answer</button>
      </div>
    );
  }
}

Question.propTypes = {

};

export default Question;

