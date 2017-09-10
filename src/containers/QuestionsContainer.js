import { connect } from 'react-redux';
// import { fetchFolders } from '../actions';
import Question from '../components/Question';

const mapStateToProps = () => {
  // return { folders };
  return true;
};

const mapDispatchToProps = (dispatch) => {
  // return { fetchFolders: id => dispatch(fetchFolders(id)) };
  return true;
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
