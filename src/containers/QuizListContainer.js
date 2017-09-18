import { connect } from 'react-redux';
import { createRoom, selectQuiz, deleteQuiz } from '../actions';
import QuizList from '../components/QuizList';

const mapStateToProps = ({ selectedFolder, room, folders }) => {
  return { selectedFolder, room, folders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: id => dispatch(createRoom(id)),
    selectQuiz: obj => dispatch(selectQuiz(obj)),
    deleteQuiz: id => dispatch(deleteQuiz(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
