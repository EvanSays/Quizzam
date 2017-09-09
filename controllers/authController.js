const { db } = require('../server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.auth = (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => {
      const user = { email, first_name, last_name, password: hash };
      const token = jwt.sign(user, secretKey);
      const newUser = Object.assign(user, { token });

      db('user').insert(newUser)
        .then(() => res.status(201))
        .catch(error => res.status(500).json({ error }));
    });
};
