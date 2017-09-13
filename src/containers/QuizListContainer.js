import { connect } from 'react-redux';
import QuizList from '../components/QuizList';

const mapStateToProps = ({ quizzes }) => {
  return { quizzes };
};

export default connect(mapStateToProps, null)(QuizList);
