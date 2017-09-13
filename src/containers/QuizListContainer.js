import { connect } from 'react-redux';
import QuizList from '../components/QuizList';

const mapStateToProps = ({ selectedFolder }) => {
  return { selectedFolder };
};

export default connect(mapStateToProps, null)(QuizList);
