const classify = require('../../utils/classify');
const DBfind = require('../../model/dbfindlist');  //数据查询
const DB_One = require('../../model/dbfindone');

const Middleware = (req, res, next) => {
  let loginUser = req.session.loginUser;
  let isLogined = !!loginUser;
  if(!isLogined) {
    return  res.redirect('/login');
  }
  next()
}

const showUpload = (req, res) => {
  res.render('./admin/upload', {
    "data": {
      category: classify
    }
  })
}

const showAdmin = (req, res) => {
  DBfind(req, res).then((datalist) => {
    res.render('./admin/admin', {
      "data": {
        count: datalist[0],
        category: classify,
        list: datalist[1]
      }
    })
  })
}

const showUpdata = (req, res) => {
  DB_One.findOne(req, res).then((result) => {
    if(!result) {
      return res.redirect('/404')
    }
    res.render('./admin/updata',{
      'data' : {
        title: '数据更新',
        detail: result
      }
    })
  })
}

module.exports = {
  Middleware,
  showUpload,
  showAdmin,
  showUpdata
}