const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const encryptedPassword = (password) => {
  return bcrypt.hash(password, 10)
    .then(hash => hash)
    .catch(error => error);
};

exports.auth = (user) => {
  const password = encryptedPassword(user.password);
  return password.then((newPassword) => {
    const newUser = Object.assign(user, { password: newPassword });
    const token = jwt.sign(newUser, secretKey);
    const finalUser = Object.assign(newUser, { token });
    return new Promise(res => res(finalUser));
  });
};
