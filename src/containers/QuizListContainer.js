import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { selectQuiz } from '../actions';
import QuizList from '../components/QuizList';

const mapStateToProps = ({ selectedFolder }) => {
  return { selectedFolder };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectQuiz: obj => dispatch(selectQuiz(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
