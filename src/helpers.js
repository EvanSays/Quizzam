/* eslint-disable no-mixed-operators */
const getKey = () => Math.round(Math.random() * Date.now());
const getKeyType = (index, identifier) => `${identifier}-${index}`;

const genRoomNumber = () => {
  const alphaMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let roomNumber = '';
  for (let i = 0; i < 4; i += 1) {
    const integer = Math.floor(Math.random() * 26);
    roomNumber += alphaMap.charAt(integer);
  }
  return roomNumber;
};

const questionTypes = {
  'true/false': 'Select true or false',
  'multiple choice': 'Select the most correct answer',
  'multiple choice-multiple answer': 'Select all that apply',
  matching: 'UNDETERMINED IMPLEMENTATION',
  'short answer': 'UNDETERMINED IMPLEMENTATION',
  essay: 'UNDETERMINED IMPLEMENTATION',
};

const folderColors = [
  {
    bg: '#FD9727',
    dark: '#52300C',
  },
  {
    bg: '#FEC93E',
    dark: '#685013',
  },
  {
    bg: '#557BB1',
    dark: '#2C3D55',
  },
  {
    bg: '#FD8A69',
    dark: '#6E3B2D',
  },
  {
    bg: '#288AE2',
    dark: '#0E3A61',
  },
];

const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getFolderColor = () => {
  const { bg, dark } = folderColors[getRandomBetween(0, 4)];

  return { bg, dark };
};

const initializeState = (quiz) => {
  const initialState = [];
  for (let i = 0; i < quiz.questions.length; i += 1) {
    initialState.push({ selectedAnswers: [] });
  }
  return initialState;
};

const getWidths = (results) => {
  return results.reduce((obj, result) => {
    const current = obj;

    if (!obj[result]) {
      current[result] = 0;
    }
    current[result] += 1;

    return current;
  }, {});
};

const getTotalSubmissions = (users, id) => Object.values(users).filter(obj => `${id}` in obj).length;

const getResults = users => Object.values(users).reduce((arr, user) => {
  arr.push(...Object.values(user));
  return arr;
}, []);

const getPercentage = (results, total, answers) => {
  const correctAnswer = answers.find(answer => answer.correct).id;

  if (total === 0) {
    return 0;
  }

  const correctTotal = results.filter(result => result === `${correctAnswer}`).length;

  return Math.round(correctTotal / total * 100);
};

module.exports = {
  getKey,
  genRoomNumber,
  questionTypes,
  getFolderColor,
  getKeyType,
  folderColors,
  getWidths,
  initializeState,
  getTotalSubmissions,
  getResults,
  getPercentage,
};
