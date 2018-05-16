const category = require('../../utils/category');
const DBfind = require('../../model/dbfindlist');  //数据查询

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
      category: category
    }
  })
}

const showAdmin = (req, res) => {
  DBfind(req, res).then((datalist) => {
    res.render('./admin/admin', {
      "data": {
        count: datalist[0],
        category: category,
        list: datalist[1]
      }
    })
  })
}

module.exports = {
  Middleware,
  showUpload,
  showAdmin
}