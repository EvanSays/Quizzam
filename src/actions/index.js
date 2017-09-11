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
