let express=require('express');
let {Article}=require('../model');
//调用Router方法 得到一个路由中间实例
let router=express.Router();
//当客户端通过GET请求的方式访问/路径的时候，会交由对应的函数来处理
router.get('/',function (req,res) {
    //populate 可以把一个字段从字符串转成对象
    //查询所有的文章  articles是数组
     Article.find().populate('user').exec(function (err,articles) {
         //路径是相对路径  相对于模板路径
         res.render('index',{title:'珠峰博客',articles});
         //console.log(articles);
     });
});
module.exports=router;