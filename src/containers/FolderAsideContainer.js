import { connect } from 'react-redux';
import { fetchFolders } from '../actions';
import FolderAside from '../components/FolderAside';

const mapStateToProps = ({ folders }) => {
  return { folders };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchFolders: id => dispatch(fetchFolders(id)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderAside);
