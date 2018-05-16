const User = require('../controller/showpage/user');
const Master = require('../controller/showpage/master');

module.exports = app => {
  app.get("/", User.showIndex);
  app.get("/list/:id", User.showList);
  app.get("/detail/:id", User.showDetail);
  app.get("/login", User.showLogin);

  app.use('/admin', Master.Middleware);
  app.get("/admin", (req, res) => { res.redirect('/admin/note/all') });
  app.get("/admin/note", (req, res) => { res.redirect('/admin/note/all') });
  app.get("/admin/note/:id", Master.showAdmin); //管理页
  app.get("/admin/note/all/:id", Master.showUpdata); //管理页
  app.get("/admin/upload", Master.showUpload); //上传页
}
