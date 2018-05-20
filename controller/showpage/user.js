const URL = require('url');
const classify = require('../../utils/classify');
const DB_findlist = require('../../model/dbfindlist');
const DB_One = require('../../model/dbfindone');
const Util = require('../../utils/util');

const showIndex = (req, res) => {
  DB_findlist(req, res).then((data) => {
    res.render('home', {
      "data": {
        category: classify,
        list: data[1],
        count: data[0]
      }
    })
  })
}

const showList = (req, res) => {
  let path = URL.parse(req.url).pathname;
  let Page = Util.getPageName(path); //当前访问的页面
  let Arr = Page.split('_');
  let nowPage = 1;
  if(Arr.length > 1) nowPage = JSON.parse(Arr[1]);
  DB_findlist(req, res).then((datalist) => {
    res.render('home', {
      "data": {
        title: '列表页',
        count: datalist[0],
        category: classify,
        list: datalist[1],
        nowpage: nowPage,
        path: Arr[0]
      }
    })
  })
}

const showDetail = (req, res) => {
  DB_One.findOne(req, res).then((result) => {
    if(!result) {
      return res.redirect('/404')
    }
    let _ID = result._id;
    //查询上一条和下一条
    Promise.all([DB_One.findPre(_ID), DB_One.findNext(_ID)]).then((data) => {
      res.render('./detail/detail',{
        'data' : {
          title: '详情',
          category: classify,
          detail: result,
          pre: data[1],
          next: data[0]
        }
      })
    })
  })
}

const showLogin = (req, res) => {
  let loginUser = req.session.loginUser
  if (loginUser) return res.redirect('/admin/note/all')
  res.render('login')
}

module.exports = {
  showIndex,
  showList,
  showDetail,
  showLogin
}