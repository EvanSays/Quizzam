import { connect } from 'react-redux';
import { fetchFolders } from '../actions';
import CreateQuiz from '../components/CreateQuiz';

const mapStateToProps = ({ selectedFolder, user }) => {
  return { selectedFolder, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolders: id => dispatch(fetchFolders(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
