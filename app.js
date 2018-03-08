const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

app.use(bodyParser());
app.use(json());

const auth = require('./controllers/authenticate');

app
  .use(auth.routes())
  .use(auth.allowedMethods());

module.exports = app;
