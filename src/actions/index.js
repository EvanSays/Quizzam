import * as constants from '../constants';

export const getFolders = (folders) => {
  return { type: constants.GET_FOLDERS, folders };
};

export const foldersLoading = (bool) => {
  return { type: constants.FOLDERS_LOADING, bool };
};

export const foldersFail = (bool) => {
  return { type: constants.FOLDERS_FAIL, bool };
};

export const fetchFolders = (id) => {
  
  return (dispatch) => {
    console.log('id', id);
    dispatch(foldersLoading(true));
    fetch(`api/v1/users/${id}/folders`)
      .then((res) => {
        dispatch(foldersLoading(false));
        return res.json();
      })
      .then((folders) => {
        console.log('folders', folders);
        
        dispatch(getFolders(folders));
        dispatch(foldersFail(false));
      })
      .catch(() => foldersFail(true));
  };
};

export const selectFolder = (folder) => {
  return { type: constants.SELECT_FOLDER, folder };
};

export const addFolder = (data) => {
  const folder = Object.assign(data, { quizzes: [] });

  return { type: constants.NEW_FOLDER, folder };
};

export const createFolder = ({ name, id }) => {
  return (dispatch) => {
    fetch(`api/v1/users/${id}/folders`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        dispatch(addFolder(data[0]));
        dispatch(foldersFail(false));
      })
      .catch(() => foldersFail(true));
  };
};


export const userName = (name) => {
  return { type: constants.USER_NAME, name };
};

export const getUser = (user) => {
  return { type: constants.GET_USER, user };
};

export const userLoading = (bool) => {
  return { type: constants.USER_LOADING, bool };
};

export const userFail = (bool) => {
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
        dispatch(userFail(false));
        return res.json();
      })
      .then((user) => {
        if (user.error) {
          return dispatch(userFail(true));
        }
        return dispatch(getUser(user));
      })
      .catch(() => {
        dispatch(userFail(true));
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
        dispatch(userFail(false));
      })
      .catch(() => {
        dispatch(userFail(true));
      });
  };
};

export const getRoom = (room) => {
  return { type: constants.GET_ROOM, room };
};

export const roomFail = (bool) => {
  return { type: constants.ROOM_FAIL, bool };
};

export const roomLoading = (bool) => {
  return { type: constants.ROOM_LOADING, bool };
};

export const roomCode = (code) => {
  return { type: constants.ROOM_CODE, code };
};

export const getQuiz = (quiz) => {
  return { type: constants.GET_QUIZ, quiz };
};

export const createRoom = (quiz) => {
  return (dispatch) => {
    dispatch(roomLoading(true));
    fetch('api/v1/room', {
      method: 'POST',
      body: JSON.stringify({ quiz_id: quiz.id }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        dispatch(roomLoading(false));
        return res.json();
      })
      .then((data) => {
        dispatch(getQuiz(quiz));
        dispatch(roomFail(false));
        dispatch(getRoom(data.id));
      })
      .catch(() => dispatch(roomFail(true)));
  };
};


export const quizLoading = (bool) => {
  return { type: constants.QUIZ_LOADING, bool };
};

export const quizFail = (bool) => {
  return { type: constants.QUIZ_FAIL, bool };
};

export const fetchQuiz = (room, name) => {
  return (dispatch) => {
    dispatch(quizLoading(true));
    fetch(`api/v1/room/${room}`)
      .then((res) => {
        dispatch(quizLoading(false));
        dispatch(roomCode(room));
        dispatch(userName(name));
        return res.json();
      })
      .then((quiz) => {
        dispatch(getQuiz(quiz));
        dispatch(quizLoading(false));
      })
      .catch(() => {
        quizFail(true);
      });
  };
};

export const selectQuiz = (obj) => {
  return { type: constants.EDIT_QUIZ, obj };
};

export const removeQuizFolder = (id) => {
  return { type: constants.DELETE_QUIZ, id };
};

export const deleteQuiz = (id) => {
  return (dispatch) => {
    fetch(`api/v1/quizzes/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        dispatch(removeQuizFolder(id));
      })
      .catch(() => {
      });
  };
};

export const addQuestion = (question) => {
  return { type: 'ADD_QUESTION', question };
};
