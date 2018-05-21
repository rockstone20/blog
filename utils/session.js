// const FileStore = require('session-file-store')(session);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sess = {
  secret: 'keyboard', // 用来对session id相关的cookie进行签名
  //store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  store: new MongoStore({
    url: 'mongodb://localhost:27017/blog',
    autoRemove: 'interval',
    autoRemoveInterval: 12 * 60 // 分钟
  }),
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: { maxAge: 12 * 60 * 60 * 1000 }// 有效期，单位是毫秒
}

module.exports = session(sess);
