import * as constants from '../constants';

const getFolders = (folders) => {
  return { type: constants.GET_FOLDERS, folders };
};

const foldersLoading = (bool) => {
  return { type: constants.FOLDERS_LOADING, bool };
};

export const foldersFail = (bool) => {
  return { type: constants.FOLDERS_FAIL, bool };
};

export const fetchFolders = (id) => {
  return (dispatch) => {
    dispatch(foldersLoading(true));
    fetch(`/teachers/${id}/folders`)
      .then((res) => {
        foldersLoading(false);
        return res.json();
      })
      .then((folders) => {
        getFolders(folders);
        foldersFail(false);
      })
      .catch(() => foldersFail(true));
  };
};
