import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { foldersReducer, foldersLoadingReducer, foldersFailReducer } from './foldersReducer';

export default combineReducers({
  router: routerReducer,
  folders: foldersReducer,
  foldersLoading: foldersLoadingReducer,
  foldersFail: foldersFailReducer,
});
