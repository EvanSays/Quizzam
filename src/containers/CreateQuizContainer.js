import { connect } from 'react-redux';
import { fetchFolders } from '../actions';
import CreateQuiz from '../components/CreateQuiz';

const mapStateToProps = ({ selectedFolder }) => {
  return { selectedFolder };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolders: id => dispatch(fetchFolders(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
