<<<<<<< HEAD
<<<<<<< HEAD
import React, { Component } from 'react';
import { func } from 'prop-types';
import { getKey } from '../helpers';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import React, { Component } from 'react';
<<<<<<< HEAD
=======
import { getKey } from '../helpers';
>>>>>>> Add path for getKeys.
import PropTypes from 'prop-types';
>>>>>>> wip
=======

>>>>>>> Add addQuestion reducer working.
=======
>>>>>>> Add housekeeping and proptypes to Answer
import Answer from './Answer';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
<<<<<<< HEAD
      answers: {},
    };

    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleAddNewAnswer = this.handleAddNewAnswer.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
  }

  handleQuestionInput(e) {
    this.setState({ title: e.target.value });
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

  handleAddQuestion() {
    const { addQuestion } = this.props;
    const { title } = this.state;
    const { answers } = this.state;

    addQuestion({ title, answers });
  }

  render() {
    const answers = Object.keys(this.state.answers).map((answer) => {
      return (
        <Answer
          key={answer}
          id={answer}
          onChange={this.handleOnChange}
          value={this.state.answers[answer]}
        />
      );
    });

    return (
      <section className="question">
=======
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
>>>>>>> wip
        <h1>QUESTION</h1>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleQuestionInput}
<<<<<<< HEAD
          placeholder="Enter Question"
        />
        {answers}
        <button onClick={this.handleAddNewAnswer}>Add Answer</button>
        <button onClick={this.handleAddQuestion}>Submit Question</button>
      </section>
=======
          placeholder="Question" />
        {this.renderAnswers()}
        <button onClick={this.addAnswer}>Add Answer</button>
      </div>
>>>>>>> wip
    );
  }
}

<<<<<<< HEAD
export default Question;
=======
import React from 'react';

const Question = ({ id, addAnswer }) => {
  return (
    <div>
      <input id={id} type="text" placeholder="Question" />
      <button onClick={() => addAnswer(id)}>Add Answer</button>
    </div>
  );
};

export default Question;
<<<<<<< HEAD
>>>>>>> add loop to render a new quuestion and answer
=======
>>>>>>> Add dynamically add answers.
=======
Question.propTypes = {
  addQuestion: func,
};

export default Question;

>>>>>>> wip
