const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');

const clientSafeFields = ['key', 'value', 'updatedAt'];

const schema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique : true
  },
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    default: new Date().getTime()
  },
  updatedAt: {
    type: Number
  }
});

schema.methods.new = function() {
  this.id = mongoose.Types.ObjectId();
  this.updatedAt = new Date().getTime();
  return new Promise((resolve, reject) => {
    return this.save().then(res => {
      console.log(res)
      return resolve(_.pick(res, clientSafeFields));
    }).catch(err => {
      console.log(err);
      return reject(err);
    });
  });
}

schema.statics.findByKey = function(key) {
  return new Promise((resolve, reject) => {
    return this.findOne({ key }).sort({updatedAt: -1}).then(res => {
      return resolve(_.pick(res, clientSafeFields));
    })
    .catch(err => {
      return reject(err);
    })
  });
};

schema.statics.findByKeyAndTs = function(key, timestamp) {
  return new Promise((resolve, reject) => {
    return this
      .find({ key, updatedAt: {'$lte': timestamp*1000} })
      .sort({updatedAt: -1})
      .limit(1)
      .then(res => {
        if (res.length === 0) {
          return resolve(null);
        };
        return resolve(_.pick(res, clientSafeFields));
      }
    )
    .catch(err => {
      return reject(err);
    })
  });
};

module.exports = mongoose.model('auth', schema);
