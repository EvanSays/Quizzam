import { connect } from 'react-redux';
import { login, signUp, userFail } from '../actions';
import LoginForm from '../components/LoginForm';

const mapStateToProps = ({ userFail }) => {
  return { userFail };
};

const mapDispatchToProps = (dispatch) => {
  return { 
    signUp: body => dispatch(signUp(body)),
    login: body => dispatch(login(body)),
    updateUserFail: bool => dispatch(userFail(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
