import { connect } from 'react-redux';
import { fetchQuiz } from '../actions';
import TakeQuiz from '../components/TakeQuiz';


const mapStateToProps = (roomNum) => {
  return roomNum;
};

const mapDispatchToProps = (dispatch) => {
  return { fetchQuiz: roomNum => dispatch(fetchQuiz(roomNum)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz);
