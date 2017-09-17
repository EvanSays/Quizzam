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
      questions: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.postQuiz = this.postQuiz.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleAddQuestion(question) {
    const newQuestions = [...this.state.questions, question];

    this.setState({ questions: newQuestions });
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

  postQuiz() {
    const { quizId } = this.state;
    // questions - quiz_id, question_text, question_type, difficulty,
    // answers - question_id, correct, answer_text

    this.state.questions.map((question) => {
      const { question_text } = question;

      const answers = this.reduceAnswers(question);

      fetch(`/api/v1/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_text,
          quiz_id: quizId,
        }),
      })
        .then(blob => blob.json())
        .then((data) => {
          console.log('data: ', data);
          answers.answers.forEach((answer) => {
            console.log('answer: ', answer);
            fetch(`/api/v1/questions/${data.id}/answers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Object.assign(answer, { question_id: data.id })),
            })
              .then(blob => blob.json())
              .then(data2 => console.log(data2))
              .catch(err => console.error(err));
          });
        })
        .catch(err => console.error(err));
    });
  }

  reduceAnswers(object) {
    const correct = object.correct;
    return Object.keys(object).reduce((obj, e) => {
      if (e !== 'question_text' && e !== 'correct') {
        const answerObj = {};
        answerObj.answer_text = object[e];
        if (correct === e) {
          answerObj.correct = true;
        }
        obj.answers.push(answerObj);
      } else {
        obj[e] = object[e];
      }
      return obj;
    }, { answers: [] });
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

    return (
      <section>
        <QuestionContainer
          key={getKey()}
          onAnswerChange={this.handleAnswerChange}
          handleAddQuestion={this.handleAddQuestion}
        />
        <button onClick={this.addQuestion}>Add Question</button>
        <button onClick={this.postQuiz}>Add Quiz</button>
      </section>
    );
  }
}

CreateQuiz.propTypes = {

};

export default CreateQuiz;
