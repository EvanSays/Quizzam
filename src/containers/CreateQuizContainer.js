import { connect } from 'react-redux';
import { fetchFolders } from '../actions';
import CreateQuix from '../components/CreateQuiz';

const mapStateToProps = ({ folders }) => {
  return { folders };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchFolders: id => dispatch(fetchFolders(id)) };
};

export default connect(null, null)(CreateQuiz);
