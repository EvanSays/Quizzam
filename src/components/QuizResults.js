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
      answerKey: [],
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
    const answerKey = [];

    obj.questions.map((answer) => {
      return answer.answers.map((correct) => {
        return correct.correct ? answerKey.push(correct.id.toString()) : null;
      });
    });
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

  handleIncomingUser(data) {
    const { connectedUsers } = this.state;
    this.setState({ connectedUsers: [...connectedUsers, data.name] });
  }

  handleOnClick() {
    console.log('this.state.quiz',this.state.quiz );
    
    // this.setState({selectedQuiz})

  }

  render() {
    const { quizData, connectedUsers } = this.state;
    return (
      <section className="quiz-results">
        <ResultsChart />
        <QuizResultsAside 
          handleOnClick={this.handleOnClick} 
          quizData={quizData}
          connectedUsers={connectedUsers}
        />
      </section>
    );
  }
}
