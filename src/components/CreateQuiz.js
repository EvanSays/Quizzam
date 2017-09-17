import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionContainer from '../containers/QuestionsContainer';
import { getKey } from '../helpers';


class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      subject: '',
      type: '',
      quizId: '',
      questions: {
        0: {
          question_text: '',
          answers: {
            a1: { answerText: '', correct: false },
            a2: { answerText: '', correct: false },
            a3: { answerText: '', correct: false },
            a4: { answerText: '', correct: false },
          },
        },
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    const { questions } = this.state;
    const stateLength = Object.keys(questions).length;

    const newQuestions = Object.assign({}, questions, { [stateLength]: {
      question_text: '',
      answers: {
        a1: { answerText: '', correct: false },
        a2: { answerText: '', correct: false },
        a3: { answerText: '', correct: false },
        a4: { answerText: '', correct: false },
      },
    } });

    this.setState({ questions: newQuestions });
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, type, subject } = this.state;
    const { id, user_id } = this.props.selectedFolder;

    fetch('/api/v1/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        subject,
        type,
        user_id,
        folder_id: id,
      }),
    })
      .then(blob => blob.json())
      .then(data => this.setState({ quizId: data.id }))
      .catch(err => console.error(err));
  }

  render() {
    const { quizId } = this.state;

    if (!quizId) {
      return (
        <form>
          <input
            type="text"
            name="name"
            onChange={this.handleInputChange}
            value={this.state.name}
            placeholder="Quiz Name"
          />
          <input
            type="text"
            name="subject"
            onChange={this.handleInputChange}
            value={this.state.subject}
            placeholder="Quiz Subject"
          />
          <input
            type="text"
            name="type"
            onChange={this.handleInputChange}
            value={this.state.type}
            placeholder="Quiz Type"
          />
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </form>
      );
    }
    const Questions = Object.keys(this.state.questions)
      .map((question, index) => {
        return (<QuestionContainer
          key={getKey()}
          index={index}
        />);
      });
    return (
      <section>
        {Questions}
        <button onClick={this.addQuestion}>Add Question</button>
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
