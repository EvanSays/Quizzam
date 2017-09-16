import { connect } from 'react-redux';
import { createRoom } from '../actions';
import App from '../components/App';

const mapStateToProps = ({ user, room, quiz }) => {
  return { user, room, quiz };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: id => dispatch(createRoom(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
