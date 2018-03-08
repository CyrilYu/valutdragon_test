module.exports = {
  requestValidate: async (ctx) => {
    console.log('libs');
    if (ctx.get('content-type') !== 'application/json' && ctx.get('content-type') !== 'application/x-www-form-urlencoded') {
      throw new Error('Invalid date type....');
    }
    for (key in ctx.body) {
      if (typeof ctx.body[key] !== 'string') {
        throw new Error(`Value of key ${key} must be a string type.`);
      }
    }
  }
}