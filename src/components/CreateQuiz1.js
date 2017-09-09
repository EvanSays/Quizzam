import React, { Component } from 'react';
import Question from './Question';
import Answer from './Answer';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      fieldNum: 0,
      quiz: '',
      folder: '',
      QA: 
      {
        q1: 
        {
          title: '',
          answers: 
          {
            a1: '',
          },
        },
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // fetch 
  }

  handleFormClick(event) {
    event.preventDefault();
    console.log('working');
  }

  handleAddQuestionClick(event) {
    console.log('working');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  renderQuestions() {
    // let questionsArray = [];
    // let questionLength = Object.keys(this.state.QA).length;

    // for (let i = 0; i < questionLength; i++) {
    //   questionsArray.push(<Question id={i} key={Math.random()} />)

    //   for (let j = 0; j < answersLength; j++) {
    //     questionsArray.push(<Answer id={j} key={Math.random()} />)
    //   }
    // }
    // console.log(questionsArray)
    // return questionsArray
  }

  addFields(num) {
    for (let i = 0; i < num; i += 1) {
      const state = this.state.QA;
      this.setState({
        QA:
        {
          q2:
          {
            title: '',
            answers:
            {
              a1: '',
            },
          },
        },
      });
    }
  }
  render() {

    return (
      <div>

        <input value={this.state.fieldNum} 
               type="text" 
               placeholder="How many answers?" 
               onChange={(event) => this.setState({ fieldNum: event.target.value })} />
        <button onClick={() => this.addFields(this.state.fieldNum)}>Submit</button>

        <form onSubmit={this.handleFormClick}>
        </form>

        <input type="submit" 
               value="Create Question" 
               onClick={this.handleAddQuestionClick} />

      </div>
    );
  }
}

export default CreateQuiz;
