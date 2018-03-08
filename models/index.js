const Promise = require('bluebird');
const mongoose = require('mongoose');
const chalk = require('chalk');

const config = require('../config')[`${process.env.NODE_ENV}`];

console.log(config);

Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;
mongoose.set('debug', true)
mongoose.connectAsync(`${config.mongodb.host}/${config.mongodb.db}`);
const connection = mongoose.connection;
console.log(chalk.blue(`mongodb connect to: ${config.mongodb.host}/${config.mongodb.db}`));

module.exports = {
  Auth: require('./auth')
};