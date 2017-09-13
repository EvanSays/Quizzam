import { connect } from 'react-redux';
import WelcomeView from '../components/WelcomeView';

const mapStateToProps = ({ quiz, user }) => {
  return { quiz, user };
};

export default connect(mapStateToProps)(WelcomeView);
