import * as constants from '../constants';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_USER:
      return action.user;
    default:
      return state;
  }
};

export const userFailReducer = (state = false, action) => {
  switch (action.type) {
    case constants.USER_FAIL:
      return action.bool;
    default:
      return state;
  }
};

export const userLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case constants.USER_LOADING:
      return action.bool;
    default:
      return state;
  }
};
