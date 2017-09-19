import * as constants from '../constants';

export const codeReducer = (state = '', action) => {
  switch (action.type) {
    case constants.ROOM_CODE:
      return action.code;
    default:
      return state;
  }
};

export const userNameReducer = (state = '', action) => {
  switch (action.type) {
    case constants.USER_NAME:
      return action.name;
    default:
      return state;
  }
};
