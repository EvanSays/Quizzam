import * as constants from '../constants';

export const roomReducer = (state = '', action) => {
  switch (action.type) {
    case constants.GET_ROOM:
      return action.room;
    default:
      return state;
  }
};

export const roomFailReducer = (state = false, action) => {
  switch (action.type) {
    case constants.ROOM_FAIL:
      return action.bool;
    default:
      return state;
  }
};

export const roomLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case constants.ROOM_LOADING:
      return action.bool;
    default:
      return state;
  }
};
