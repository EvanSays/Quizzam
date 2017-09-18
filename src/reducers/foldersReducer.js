import * as constants from '../constants';

export const foldersReducer = (state = [], action) => {
  switch (action.type) {
    case constants.GET_FOLDERS:
      return action.folders;
    case constants.NEW_FOLDER:
      return [...state, action.folder];
    case constants.DELETE_QUIZ:
      return [...state].map((folder) => {
        const current = folder;
        const quizzes = current.quizzes.filter(quiz => quiz.id !== action.id);

        current.quizzes = quizzes;
        return current;
      });
    default:
      return state;
  }
};

export const foldersLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case constants.FOLDERS_LOADING:
      return action.bool;
    default:
      return state;
  }
};

export const foldersFailReducer = (state = false, action) => {
  switch (action.type) {
    case constants.FOLDERS_FAIL:
      return action.bool;
    default:
      return state;
  }
};

export const selectedFolderReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SELECT_FOLDER:
      return action.folder;
    case constants.DELETE_QUIZ:
      return Object.assign({}, state, { quizzes: state.quizzes.filter(quiz => quiz.id !== action.id) });
    default:
      return state;
  }
};
