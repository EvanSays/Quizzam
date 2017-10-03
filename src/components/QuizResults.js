/* eslint-disable react/no-unused-state */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultsChart from './ResultsChart';
import QuizResultsAside from './QuizResultsAside';
import socket from '../socket';
import './styles/QuizResults.scss';

class QuizResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: props.quiz,
      users: {},
      answerKey: {},
      selectedQuestion: {},
      connectedUsers: [],
      activeIndex: null,
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

  handleOnClick(selectedQuestion, index) {
    this.setState({ selectedQuestion, activeIndex: index });
  }

  handleIncomingUser(data) {
    const { connectedUsers } = this.state;
    this.setState({ connectedUsers: [...connectedUsers, data.name] });
  }

  render() {
    const { quizData, users, connectedUsers, activeIndex } = this.state;
    const resultCards = quizData.questions.map((question) => {
      return <ResultsChart key={question.id} question={question} users={users} />;
    });

    return (
      <section className="quiz-results">
        {resultCards}
        <QuizResultsAside
          onHandleOnClick={this.handleOnClick}
          quizData={quizData}
          activeIndex={activeIndex}
          connectedUsers={connectedUsers}
        />
      </section>
    );
  }
}

QuizResults.propTypes = {
  quiz: PropTypes.object,
  room: PropTypes.string,
};

export default QuizResults;
