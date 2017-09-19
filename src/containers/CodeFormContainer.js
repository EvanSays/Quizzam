import { connect } from 'react-redux';
import { fetchQuiz } from '../actions';
import CodeForm from '../components/CodeForm';

const mapStateToProps = ({ code, name }) => {
  return { code, name };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuiz: (room, user) => dispatch(fetchQuiz(room, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeForm);
