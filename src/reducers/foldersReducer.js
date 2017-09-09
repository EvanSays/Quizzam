import * as constants from '../constants';

export const foldersReducer = (state=[], action) => {
  switch(action.type) {
    case constants.GET_FOLDERS:
      return action.folders;
    default:
      return state;
  };
};

export const foldersLoadingReducer = (state=false, action) {
 switch(action.type) {
  case constants.FOLDERS_LOADING:
    return action.bool; 
  default:
    return state;
 }
}

export const foldersFail = (state=false, action) {
 switch(action.type) {
  case constants.FOLDERS_FAIL:
    return action.bool; 
  default:
    return state;
 }  
}