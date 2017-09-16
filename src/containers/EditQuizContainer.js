import { connect } from 'react-redux';
// import {} from '../actions';
import EditQuiz from '../components/EditQuiz';

const mapStateToProps = ({ edit }) => {
  return { edit };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchFolders: id => dispatch(fetchFolders(id)),
//     createFolder: obj => dispatch(createFolder(obj)),
//     selectFolder: obj => dispatch(selectFolder(obj)),
//   };
// };


export default connect(mapStateToProps, null)(EditQuiz);
