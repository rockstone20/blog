const category = require('../../utils/category');
const DB_findlist = require('../../model/dbfindlist');
const DB_One = require('../../model/dbfindone');

const showIndex = (req, res) => {
  res.render('index', {
    "title": '飒飒啊'
  })
}

const showList = (req, res) => {
  DB_findlist(req, res).then((datalist) => {
    console.log(datalist[0])
    res.render('list', {
      "data": {
        title: '列表页',
        count: datalist[0],
        category: category,
        list: datalist[1]
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
          detail: result,
          pre: data[0],
          next: data[1]
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