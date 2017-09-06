const express = require('express');
const path = require('path');
const cors = require('express-cors');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './build')));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Quizzam is running on ${app.get('port')}.`);
});

module.exports = app;
