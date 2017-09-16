import { connect } from 'react-redux';
import { createRoom, selectQuiz } from '../actions';
import QuizList from '../components/QuizList';

const mapStateToProps = ({ selectedFolder, room }) => {
  return { selectedFolder, room };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: id => dispatch(createRoom(id)),
    selectQuiz: obj => dispatch(selectQuiz(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
