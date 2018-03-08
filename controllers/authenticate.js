const Router = require('koa-router');
const moment = require('moment');
const router = new Router();
const lib = require('../libs');
const model = require('../models');
const Auth = model.Auth;

const APIs = {
  getObjectByKey: '/object/:key',
  createKey: '/object'
}

router.get(APIs.getObjectByKey, async (ctx, next) => {
  let key = ctx.params.key;
  let keyValue = null
  try {
    if (ctx.query.timestamp) {
      console.log(new Date(ctx.query.timestamp*1000).toISOString());
      keyValue = await Auth.findByKeyAndTs(key, ctx.query.timestamp);
      if (!keyValue) {
        ctx.status = 200
        ctx.body = {}
        return
      }
    } else {
      keyValue = await Auth.findByKey(key);
    }
    keyValue['updatedAt'] = moment(keyValue['updatedAt']).unix();
    ctx.body = keyValue;
  } catch (err) {
    ctx.set('Content-Type', 'application/json');
    ctx.status = 400;
    ctx.body = {error: err.message};
  }
});

router.post(APIs.createKey, async (ctx, next) => {
  try {
    const validate = await lib.requestValidate(ctx);
  } catch (err) {
    console.log(err.message);
    ctx.set('Content-Type', 'application/json');
    ctx.status = 400;
    ctx.body = {error: err.message};
    return
  }
  let body = JSON.parse(JSON.stringify(ctx.request.body));
  let keys = Object.keys(body);
  let key = keys[0];
  let value = body[keys[0]];
  let data = new Auth({key, value});
  try {
    let keyValue = await data.new();
    console.log(keyValue);
    keyValue['updatedAt'] = moment(keyValue['updatedAt']).unix();
    ctx.body = keyValue;
  } catch (err) {
    console.log(err.message);
    ctx.set('Content-Type', 'application/json');
    ctx.status = 400;
    ctx.body = {error: err.message};
    return
  }
});

module.exports = router;