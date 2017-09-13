import { connect } from 'react-redux';
import { fetchFolders, createFolder, getQuizzes } from '../actions';
import FolderAside from '../components/FolderAside';

const mapStateToProps = ({ folders, user }) => {
  return { folders, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolders: id => dispatch(fetchFolders(id)),
    createFolder: obj => dispatch(createFolder(obj)),
    getQuizzes: obj => dispatch(getQuizzes(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderAside);
