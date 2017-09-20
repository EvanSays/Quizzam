import React, { Component } from 'react';
import ResultsChart from './ResultsChart';
import QuizResultsAside from './QuizResultsAside';
import socket from '../socket';

export default class QuizResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: props.quiz,
      results: {},
      users: {},
      answerKey:{},
      selectedQuestion: {},
      connectedUsers: [],
    };
    this.handleIncomingAnswer = this.handleIncomingAnswer.bind(this);
    this.handleIncomingUser = this.handleIncomingUser.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    socket.on(`${this.props.room}submittedAnswer`, (data) => {
      this.handleIncomingAnswer(data);
    });
    socket.on(`${this.props.room}connnectedUser`, (data) => { 
      this.handleIncomingUser(data);
    });
  }

  componentDidMount() {
    this.answerKeyGenerator(this.state.quiz);
  }

  answerKeyGenerator(obj) {
    const answerKey = obj.questions.reduce((acc, question) => {
      question.answers.map((answer) => {
        if (answer.correct) {
          acc[`Q${answer.question_id}`] = answer.id;
        }
      });
      return acc;
    }, {});
    return this.setState({ answerKey });
  }

  handleIncomingAnswer(answerObj) {
    const { answer, name, questionId } = answerObj;
    const newState = Object.assign({}, this.state.users);

    if (!newState[name]) {
      newState[name] = { [questionId]: answer };
    } else {
      newState[name] = Object.assign(newState[name], { [questionId]: answer });
    }

    this.setState({ users: newState });
  }
  
  handleOnClick(selectedQuestion) {
    this.setState({ selectedQuestion });
  }

  handleIncomingUser(data) {
    const { connectedUsers } = this.state;
    this.setState({ connectedUsers: [...connectedUsers, data.name] });
  }

  render() {
    const { quizData, selectedQuestion, users, connectedUsers } = this.state;
    return (
      <section className="quiz-results">
        <ResultsChart selectedQuestion={selectedQuestion} users={users} />
        <QuizResultsAside 
          handleOnClick={this.handleOnClick} 
          quizData={quizData}
          connectedUsers={connectedUsers}
        />
      </section>
    );
  }
}
