const fs = require('fs');
const path = require("path");

const data = new Date();
const year = data.getFullYear();

const mkdir = (dirpath, callback) => {
  // 如果文件夹不存在则创建
  if(!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath); //创建
  }
  dirpath = path.normalize(dirpath + '/' + year);  // 上传的图片按年份分类
  if(!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath);
  }
  callback(dirpath)
}

const getImgName = (path) => {
  let arr = path.indexOf('/') > -1 ? path.split('/') : path.split('\\') ;
  return arr[arr.length-1]
}

exports.saveImg = (fields, files) => {
  let dirpath = path.normalize(__dirname + '/../uploads/' + fields.type);  // 图片保存的文件夹

  return new Promise((resolve, reject) => {
    mkdir(dirpath, function (dir) {
      let oldPath = files.img.path; // 临时路径
      let ImgName = getImgName(oldPath);
      let newPath = dir + '/' + ImgName;

      fs.renameSync(oldPath, newPath); //移动文件
      console.log(newPath)
      resolve('/' + fields.type + '/' + year + '/' + ImgName)
    })
  })
}
