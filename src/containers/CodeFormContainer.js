import { connect } from 'react-redux';
import { fetchQuiz } from '../actions';
import CodeForm from '../components/CodeForm';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuiz: room => dispatch(fetchQuiz(room)),
  };
};

export default connect(null, mapDispatchToProps)(CodeForm);
