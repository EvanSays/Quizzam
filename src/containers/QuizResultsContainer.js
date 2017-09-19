import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuiz } from '../actions';
import QuizResults from '../components/QuizResults';

const mapStateToProps = ({ quiz, room }) => {
  return { quiz, room };
};

export default withRouter(connect(mapStateToProps)(QuizResults));
