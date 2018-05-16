const formidable = require('formidable');
const models = require('../../model/model');
const Upload = require('../../model/uploadimg');

const Users = require('../../model/db/user');
const findUser = (name, password) => {
    return Users.name === name && Users.password === password;
};
// 处理表单
const _FormIdable = (req) => {
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = __dirname + '/../../tempup';  // 图片上传的临时路径
  form.keepExtensions = true;  //保留后缀

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files)=> {
      resolve({err, fields, files})
    })
  })
}

//图片上传
const uploadImg = (req, res) => {
  _FormIdable(req).then(Obj => {
    return Upload.saveImg(Obj.fields, Obj.files)
  }).then(imgPath => {
    res.json({
      ok: 0,
      url: imgPath
    })
  })
}

//写入文章
const writeIn = (req, res) => {
  _FormIdable(req).then(Obj => {
    let addBlog = new models.blog(Obj.fields);
    let dataNow = new Date();
    let timestamp = dataNow.getTime();
    addBlog.id = addBlog.type + '_' + timestamp;
    addBlog.createtime = dataNow.getFullYear() + '-' + (dataNow.getMonth() + 1) + '-' + dataNow.getDate();

    addBlog.save((err) => {
      if (err) return console.error(err);
      res.json({
        ok: 0,
        msg: '上传成功'
      })
    })
  })
}

//删除
const deleteData = (req, res) => {
  _FormIdable(req).then(Obj => {
    let deleteOne = new models.blog(Obj.fields);
    deleteOne.remove((err) => {
      if (err) return console.error(err);
      res.json({
        ok: 0,
        msg: '删除成功'
      })
    })
  })
}
//更新
const Updata= (req, res) => {
  _FormIdable(req).then(Obj => {
    let UpdataOne = new models.blog(Obj.fields);
    UpdataOne.update((err) => {
      if (err) return console.error(err);
      res.json({
        ok: 0,
        msg: '更新成功'
      })
    })
  })
}

// 登录
const userLogin = (req, res) => {
  _FormIdable(req).then((Obj) => {
    var user = findUser(Obj.fields.name, Obj.fields.password);
    if(user){
      req.session.regenerate(function(err) {
        if(err){
          return res.json({ret_code: 2, ret_msg: '登录失败'});
        }
        req.session.loginUser = Obj.fields.name;
        // res.json({ret_code: 0, ret_msg: '登录成功'});
        res.redirect('/admin/note/all')
      });
    }else{
      res.json({ret_code: 1, ret_msg: '账号或密码错误'});
    }
  })
}

module.exports = {
  uploadImg,
  writeIn,
  userLogin,
  deleteData,
  Updata
}