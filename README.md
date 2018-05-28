## blog
node + express + mongoose + ejs 后端渲染

## 目录结构

1. toutes   // 路由的封装分发
2. static   // 静态资源
3. temup  //  图片临时上传存储目录
4. uploads  //  图片保存目录，会根据类别、年份创建文件夹，small 为生成的小图目录
5. utils  // 公共的一些方法等
6. views  //  视图界面

* * *

##### 项目实现了文章的增删改查功能，管理页面需要登录才能操作


## 启动

启动之前需要安装node 和 mongodb 并开启数据库
项目下载下来后进到目录执行：


npm install  
// 安装项目依赖


node app  
//启动项目
