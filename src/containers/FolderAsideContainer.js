import { connect } from 'react-redux';
import { fetchFolders, createFolder, selectFolder } from '../actions';
import FolderAside from '../components/FolderAside';

const mapStateToProps = ({ folders, user }) => {
  return { folders, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolders: id => dispatch(fetchFolders(id)),
    createFolder: obj => dispatch(createFolder(obj)),
    selectFolder: obj => dispatch(selectFolder(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderAside);
