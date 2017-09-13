const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

module.exports = require('knex')(configuration);
