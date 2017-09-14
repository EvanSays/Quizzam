import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuiz } from '../actions';
import TakeQuiz from '../components/TakeQuiz';

const mapStateToProps = ({ state }) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchQuiz: roomNum => dispatch(fetchQuiz(roomNum)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TakeQuiz));
