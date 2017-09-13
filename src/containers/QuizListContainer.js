import { connect } from 'react-redux';
import { createRoom } from '../actions';
import QuizList from '../components/QuizList';

const mapStateToProps = ({ selectedFolder }) => {
  return { selectedFolder };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: id => dispatch(createRoom(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
