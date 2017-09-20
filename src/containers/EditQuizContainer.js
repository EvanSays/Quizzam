import { connect } from 'react-redux';
import EditQuiz from '../components/EditQuiz';

const mapStateToProps = ({ editQuizData }) => {
  return { editQuizData };
};

export default connect(mapStateToProps, null)(EditQuiz);
