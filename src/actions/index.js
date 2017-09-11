import * as constants from '../constants';

const getFolders = (folders) => {
  return { type: constants.GET_FOLDERS, folders };
};

const foldersLoading = (bool) => {
  return { type: constants.FOLDERS_LOADING, bool };
};

const foldersFail = (bool) => {
  return { type: constants.FOLDERS_FAIL, bool };
};

export const fetchFolders = (id) => {
  return (dispatch) => {
    dispatch(foldersLoading(true));
    fetch(`api/v1/teachers/${id}/folders`)
      .then((res) => {
        dispatch(foldersLoading(false));
        return res.json();
      })
      .then((folders) => {
        dispatch(getFolders(folders));
        dispatch(foldersFail(false));
      })
      .catch(() => foldersFail(true));
  };
};

export const addQuestion = (question) => {
  return { type: 'ADD_QUESTION', question };
};

const quizIsLoading = (bool) => {
  return { type: constants.QUIZ_IS_LOADING, bool };
};

const getQuiz = (quiz) => {
  return { type: constants.GET_QUIZ, quiz };
};

const quizFail = (bool) => {
  return { type: constants.QUIZ_FAIL, bool };
};

export const fetchQuiz = (roomNum) => {
  return (dispatch) => {
    dispatch(quizIsLoading(true));
    fetch(`api/v1/room/${roomNum}`)
      .then((res) => {
        dispatch(quizIsLoading(false));
        return res.json();
      })
      .then((quiz) => {
        dispatch(getQuiz(quiz));
        dispatch(quizFail(true));
      })
      .catch(() => {
        quizFail(true);
      });
  };
};
