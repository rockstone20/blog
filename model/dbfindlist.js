const models = require('./model');
const Util = require('../utils/util');
const URL = require('url');
const PageNum = 20;
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
  models.blog.find(SearchObj).skip(SkipNum).sort({_id: -1}).limit(num).exec((err, result) => {
    if (err) return console.error(err);
    resolve(result)
  })
});

exports = module.exports = (req, res) => {
  let path = URL.parse(req.url).pathname;
  let Page = Util.getPageName(path); //当前访问的页面
  let Arr = Page.split('_');
  let SearchObj = {},
      num = PageNum, // 每页查询条数
      nowPage = 1;
  if(Page && Page!=='all') {
    SearchObj.type = Arr[0]
  }
  if(Arr.length > 1) nowPage = JSON.parse(Arr[1]);
  //if(Obj.page) nowPage = Obj.page

  return Promise.all([getCount(SearchObj), findData(SearchObj, nowPage, num)])
};
