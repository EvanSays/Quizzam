import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(App);
