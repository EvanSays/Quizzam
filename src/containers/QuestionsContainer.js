import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import Question from '../components/Question';

const mapStateToProps = ({ questions, folders, selectedFolder }) => {
  return { questions, folders, selectedFolder };
};

const mapDispatchToProps = (dispatch) => {
  return { addQuestion: question => dispatch(addQuestion(question)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
