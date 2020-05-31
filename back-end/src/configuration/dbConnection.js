const knexStringcase = require('knex-stringcase');
// Get environment setting
const environment = process.env.NODE_ENV || 'development';

let config = require('./knexfile')[environment];
// Add string case middleware
config = knexStringcase(config);
module.exports = require('knex')(config);
