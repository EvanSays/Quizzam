import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import Question from '../components/Question';

const mapStateToProps = ({ questions }) => {
  return { questions };
};

const mapDispatchToProps = (dispatch) => {
  return { addQuestion: question => dispatch(addQuestion(question)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
