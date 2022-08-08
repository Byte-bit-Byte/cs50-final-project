// imports knex and the knexfile.js with the database settings
const knex = require('knex');
const knexfile = require('./knexfile');

// exports database as db
const db = knex(knexfile.development);
module.exports = db;

