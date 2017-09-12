import { connect } from 'react-redux';
import { fetchFolders, createFolder } from '../actions';
import FolderAside from '../components/FolderAside';

const mapStateToProps = ({ folders }) => {
  return { folders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolders: id => dispatch(fetchFolders(id)),
    addFolder: obj => dispatch(createFolder(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderAside);
