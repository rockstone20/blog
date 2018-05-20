const models = require('./model');
const Util = require('../utils/util');
const URL = require('url');

const findOne = (req, res) => new Promise((resolve) => {
  let path = URL.parse(req.url).pathname;
  let PageId = Util.getPageName(path);
  models.blog.findOne({id: PageId}, (err, result) => {
    if (err) return console.error(err);
    resolve(result)
  })
});

const findPre = _ID => new Promise((resolve) => {
  models.blog.findOne({'_id': {'$lt' : _ID} }).sort({_id: -1}).exec((err, result) => {
    resolve(result)
  })
});

const findNext = _ID => new Promise((resolve) => {
  models.blog.findOne({'_id': {'$gt': _ID} }).sort({_id: 1}).exec((err, result) => {
    resolve(result)
  })
});

module.exports = {
  findOne,
  findPre,
  findNext
}