import * as constants from '../constants';

export const getQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_QUIZ:
      return action.quiz;
    default:
      return state;
  }
};

export const quizLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case constants.QUIZ_LOADING:
      return action.bool;
    default:
      return state;
  }
};

export const quizFailReducer = (state = false, action) => {
  switch (action.type) {
    case constants.QUIZ_FAIL:
      return action.bool;
    default:
      return state;
  }
};

export const getQuizzesReducer = (state = [], action) => {
  switch (action.type) {
    case constants.GET_QUIZZES:
      return action.quizzes;
    default:
      return state;
  }
};
