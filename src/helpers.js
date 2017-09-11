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

module.exports = { getKey, genRoomNumber };
