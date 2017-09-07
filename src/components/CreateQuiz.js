import React, { Component } from 'react';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      folderName: '',
      quizName: '',
      currentQuestion: '',
      currentAnswer1: '',
      currentAnswer2: '',
      currentAnswer3: '',
      currentAnswer4: '',
      quiz: [
        {
          question: '',
          answers: [],
        },
      ],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  shouldComponentUpdate() {
    return true;
  }

  handleFormClick(event) {
    event.preventDefault();
    console.log('working');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target, value, name);
    this.setState({ [name]: value });
  }

  render() {
    const { folderName,
      quizName,
      currentQuestion,
      currentAnswer1,
      currentAnswer2,
      currentAnswer3,
      currentAnswer4,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleFormClick}>
          <input
            type="text"
            name="quizName"
            value={quizName}
            placeholder="Quiz Name"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="currentQuestion"
            value={currentQuestion}
            placeholder="Question"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="currentAnswer1"
            value={currentAnswer1}
            placeholder="Answer1"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="currentAnswer2"
            value={currentAnswer2}
            placeholder="Answer2"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="currentAnswer3"
            value={currentAnswer3}
            placeholder="Answer3"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="currentAnswer4"
            value={currentAnswer4}
            placeholder="Answer4"
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Create Question" />
        </form>

      </div>
    );
  }
}

export default CreateQuiz;
