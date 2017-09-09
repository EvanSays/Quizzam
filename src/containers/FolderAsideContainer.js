import { connect } from 'react-redux';
import FolderAside from '../components/FolderAside';

const mapStateToProps = ({ folders }) => {
  return { folders };
};

export default connect(mapStateToProps, null)(FolderAside);
