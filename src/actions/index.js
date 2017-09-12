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
    fetch(`api/v1/users/${id}/folders`)
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


const quizLoading = (bool) => {
  return { type: constants.QUIZ_LOADING, bool };
};

const getQuiz = (quiz) => {
  return { type: constants.GET_QUIZ, quiz };
};

const quizFail = (bool) => {
  return { type: constants.QUIZ_FAIL, bool };
};

export const fetchQuiz = (room) => {
  return (dispatch) => {
    dispatch(quizLoading(true));
    fetch(`api/v1/room/${room}`)
      .then((res) => {
        dispatch(quizLoading(false));
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

const getUser = (user) => {
  return { type: constants.GET_USER, user };
};

const userLoading = (bool) => {
  return { type: constants.USER_LOADING, bool };
};

const userFail = (bool) => {
  return { type: constants.USER_FAIL, bool };
};

export const signUp = (body) => {
  return (dispatch) => {
    dispatch(userLoading(true));
    fetch('api/v1/users/new', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        dispatch(userLoading(false));
        return res.json();
      })
      .then((user) => {
        dispatch(getUser(user));
        dispatch(userFail(true));
      })
      .catch(() => {
        userFail(true);
      });
  };
};

export const login = (body) => {
  return (dispatch) => {
    dispatch(userLoading(true));
    fetch('api/v1/users', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        dispatch(userLoading(false));
        return res.json();
      })
      .then((user) => {
        dispatch(getUser(user.data));
        dispatch(fetchFolders(user.data.id));
        dispatch(userFail(true));
      })
      .catch(() => {
        userFail(true);
      });
  };
};

export const createFolder = (obj) => {
  const nameObj = { name: obj.name };
  return (dispatch) => {
    fetch(`api/v1/users/${obj.id}/folders`, {
      method: 'POST',
      body: JSON.stringify(nameObj),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        dispatch(foldersFail(false));
      })
      .catch(() => foldersFail(true));
  };
};
