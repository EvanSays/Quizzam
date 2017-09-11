export const questionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [action.question, ...state];
    default:
      return state;
  }
};
