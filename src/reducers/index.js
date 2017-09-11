import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { foldersReducer, foldersLoadingReducer, foldersFailReducer } from './foldersReducer';
import { getQuizReducer, quizLoadingReducer, quizFailReducer } from './quizReducer';
import { questionsReducer } from './questionsReducer';

export default combineReducers({
  router: routerReducer,
  folders: foldersReducer,
  foldersLoading: foldersLoadingReducer,
  foldersFail: foldersFailReducer,
  questions: questionsReducer,
  getQuiz: getQuizReducer,
  quizLoading: quizLoadingReducer,
  quizFail: quizFailReducer,
});
