const Post = require('../controller/api/post');

module.exports = app => {
  // post 请求
  app.post("/upload/imgs", Post.uploadImg);
  app.post("/upload/write", Post.writeIn);

  // 登录接口
  app.post('/userlogin', Post.userLogin);
}