import { connect } from 'react-redux';
import QuizList from '../components/QuizList';

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, null)(QuizList);
