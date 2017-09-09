import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { foldersReducer } from './foldersReducer';

export default combineReducers({
  router: routerReducer,
  folders: foldersReducer,
});
