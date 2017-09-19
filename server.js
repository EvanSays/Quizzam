const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
exports.db = require('knex')(configuration);
const router = require('./router');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('test', (data) => {
    const sampleAnswer = {
      answer: 3,
      name: 'Bob',
      room: 'QUID',
      question_id: 2,
    };
    io.emit('test', sampleAnswer);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './build')));
app.use('/api/v1', router);

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './build', 'index.html'));
});

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './build', 'index.html'));
});

/* eslint-disable no-console */
server.listen(app.get('port'), () => {
  console.log(`Quizzam is running on ${app.get('port')}.`);
});
/* eslint-enable */

exports.app = app;
