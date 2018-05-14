var mongoose = require('mongoose');
var DB_url = 'mongodb://localhost:27017/blog';

exports.Connect = () => {
  mongoose.connect(DB_url , (err) => {
    if(err){
      console.log('数据库连接失败');
    }else{
      console.log('数据库连接成功');
    }
  })
}

