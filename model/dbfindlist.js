const models = require('./model');
const Util = require('../utils/util');

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
  let Page = Util.getPageName(req.url); //当前访问的页面
  let Arr = Page.split('_');
  let SearchObj = {},
    num = 5, // 每页查询5条
    nowPage = 1;
  if(Page!=='all') {
    SearchObj.type = Arr[0]
  }

  if(Arr.length > 1) nowPage = JSON.parse(Arr[1]);
  //if(Obj.page) nowPage = Obj.page

  return Promise.all([getCount(SearchObj), findData(SearchObj, nowPage, num)])
};
