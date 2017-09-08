const { db } = require('../server');

exports.index = (req, res) => {
  db('folder').select()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch(error => res.status(500).json({ error }));
};
