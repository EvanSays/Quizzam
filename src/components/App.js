import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import EditQuiz from './EditQuiz';
import QuizListContainer from '../containers/QuizListContainer';
import WelcomeViewContainer from '../containers/WelcomeViewContainer';
import FolderAsideContainer from '../containers/FolderAsideContainer';
import CreateQuizContainer from '../containers/CreateQuizContainer';
import horn from '../assets/horn.mp3';
import flash from '../assets/flash.svg';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
    };

    this.handlePlaySound = this.handlePlaySound.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  handlePlaySound() {
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    const { user, history, room, quiz } = this.props;
    const { isPlaying } = this.state;

    if (!user.id) {
      return <WelcomeViewContainer history={history} />;
    }

    if (room) {
      return (<Redirect to={{
        pathname: `/room/${room}`,
        state: { user: user.id, quiz },
      }}
      />);
    }

    const aside = room ? null : <FolderAsideContainer history={history} />;
    const sound = isPlaying ? <Sound url={horn} playStatus={Sound.status.PLAYING} /> : null;
    const logoStyle = {
      position: 'absolute',
      top: '10px',
      right: '20px',
      width: '30px',
      height: '30px',
      backgroundColor: 'transparent',
      backgroundImage: `url(${flash})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      border: 'none',
      cursor: 'pointer',
    };

    return (
      <section className="App">
        {aside}
        <Route path="/folder" component={QuizListContainer} />
        <Route path="/quiz" component={CreateQuizContainer} />
        <Route path="/dashboard/quiz/:id" component={EditQuiz} />
        {sound}
        <button onClick={this.handlePlaySound} style={logoStyle} />
      </section>
    );
  }
}

App.propTypes = {
  fetchFolders: PropTypes.func,
  getUser: PropTypes.func,
  history: PropTypes.object,
  quiz: PropTypes.object,
  room: PropTypes.string,
  user: PropTypes.object,
};

export default App;
