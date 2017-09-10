const { db } = require('../server');

exports.index = (req, res) => {
  db('question').select()
    .then(questions => res.status(200).json(questions))
    .catch(error => res.status(500).json({ error }));
};
