import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuiz } from '../actions';
import TakeQuiz from '../components/TakeQuiz';

const mapStateToProps = ({ quiz, username, code }) => {
  return { quiz, code, username };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchQuiz: roomNum => dispatch(fetchQuiz(roomNum)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TakeQuiz));
