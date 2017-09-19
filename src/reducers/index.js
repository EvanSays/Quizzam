import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { foldersReducer, foldersLoadingReducer, foldersFailReducer, selectedFolderReducer } from './foldersReducer';
import { getQuizReducer, editQuizReducer, quizLoadingReducer, quizFailReducer } from './quizReducer';
import { questionsReducer } from './questionsReducer';
import { userReducer, userFailReducer, userLoadingReducer } from './userReducer';
import { roomReducer, roomFailReducer, roomLoadingReducer } from './roomReducer';
import { codeReducer, userNameReducer } from './codeFormReducer';

export default combineReducers({
  router: routerReducer,
  folders: foldersReducer,
  foldersLoading: foldersLoadingReducer,
  foldersFail: foldersFailReducer,
  selectedFolder: selectedFolderReducer,
  questions: questionsReducer,

  user: userReducer,
  userLoading: userLoadingReducer,
  userFail: userFailReducer,

  quiz: getQuizReducer,
  editQuizData: editQuizReducer,
  quizLoading: quizLoadingReducer,
  quizFail: quizFailReducer,

  room: roomReducer,
  roomFail: roomFailReducer,
  roomLoading: roomLoadingReducer,

  code: codeReducer,
  username: userNameReducer,
});
