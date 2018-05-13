const express = require('express');
const app = express();
const path = require('path');

const session = require('./utils/session');

const DB = require('./model/db/db');
DB.Connect(); //数据库连接

const PageRouter = require('./routes/pages');
const apiRouter = require('./routes/apiRouter');

app.use(session); // 登录状态保存

//路由中间件，静态资源
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'static')));

//设置模板引擎
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");

// 路由
PageRouter(app);
apiRouter(app);

//404
app.use(function (req, res) {
  res.render("404");
});

app.listen(3000);