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

module.exports = {
  getKey,
  genRoomNumber,
  questionTypes,
  getFolderColor,
  getKeyType,
  folderColors,
  getWidths,
};
