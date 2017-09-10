import { connect } from 'react-redux';
// import { fetchFolders } from '../actions';
import Questions from '../components/Questions';

const mapStateToProps = ({ folders }) => {
  // return { folders };
  return true;
};

const mapDispatchToProps = (dispatch) => {
  // return { fetchFolders: id => dispatch(fetchFolders(id)) };
  return true;
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
