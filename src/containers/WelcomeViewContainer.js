import { connect } from 'react-redux';
import WelcomeView from '../components/WelcomeView';

const mapStateToProps = ({ quiz }) => {
  return { quiz };
};

export default connect(mapStateToProps)(WelcomeView);
