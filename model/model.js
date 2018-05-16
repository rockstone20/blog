const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  type: String,
  detail: String,
  title: String,
  imgs_url: String,
  keyword: String,
  description: String,
  id: String,
  createtime: String,
  recommend: Number,
  articletype: String
}, {
  collection: 'test'
});

const models = {
  blog: mongoose.model('blog', blogSchema)
};

module.exports = models;