import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { foldersReducer, foldersLoadingReducer, foldersFailReducer } from './foldersReducer';
import { getQuizReducer, quizLoadingReducer, quizFailReducer, getQuizzesReducer } from './quizReducer';
import { questionsReducer } from './questionsReducer';
import { userReducer, userFailReducer, userLoadingReducer } from './userReducer';

export default combineReducers({
  router: routerReducer,
  folders: foldersReducer,
  foldersLoading: foldersLoadingReducer,
  foldersFail: foldersFailReducer,
  questions: questionsReducer,

  user: userReducer,
  userLoading: userLoadingReducer,
  userFail: userFailReducer,
  quiz: getQuizReducer,
  quizLoading: quizLoadingReducer,
  quizFail: quizFailReducer,
  quizzes: getQuizzesReducer,
});
