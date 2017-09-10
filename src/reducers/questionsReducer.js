export const questionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [state, ...action.question];
    default:
      return state;
  }
};
