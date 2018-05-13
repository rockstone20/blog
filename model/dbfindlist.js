const models = require('./model');
const Util = require('../utils/util');
const URL = require('url');

// 查询文章总数
const getCount = SeachObject => new Promise((resolve) => {
  models.blog.count(SeachObject, function (err, count) {
    if (err) return console.error(err);
    resolve(count)
  })
});

// 查询文章
const findData = (SearchObj, nowPage, num) => new Promise((resolve) => {
  let SkipNum = nowPage ? nowPage*num - num : nowPage*num;
  models.blog.find(SearchObj).skip(SkipNum).limit(num).exec((err, result) => {
    if (err) return console.error(err);
    resolve(result)
  })
});

exports = module.exports = (req, res) => {
  let Obj = URL.parse(req.url, true).query;
  let path = URL.parse(req.url).pathname; //访问的路径
  let Page = Util.getPageName(path); //当前访问的页面
  let SearchObj = {},
    num = 5, // 每页查询5条
    nowPage = 0;
  if(Page!=='all') {
    SearchObj.type = Page
  }
  if(Obj.page) nowPage = Obj.page

  return Promise.all([getCount(SearchObj), findData(SearchObj, nowPage, num)])
};
