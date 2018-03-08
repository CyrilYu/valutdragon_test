require('babel-core/register');
require('babel-polyfill');

const chalk = require('chalk');
const http = require('http');

const proxyLayer = require('../app.js');
http.createServer(proxyLayer.callback()).listen(3000);

console.log(chalk.blue(`-------------------------------`));
console.log(chalk.blue(`Start IAP proxy layer service`));
console.log(chalk.blue(`Listen Port 3000`));
console.log(chalk.blue(`-------------------------------`));