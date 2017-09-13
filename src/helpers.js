const getKey = () => Math.round(Math.random() * Date.now());

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

module.exports = { getKey, genRoomNumber, questionTypes };
