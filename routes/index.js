let express=require('express');
let {Article}=require('../model');
//调用Router方法 得到一个路由中间实例
let router=express.Router();
//当客户端通过GET请求的方式访问/路径的时候，会交由对应的函数来处理
router.get('/',function (req,res) {
    //获取查询字符串对象，并将keyword解构出来
    let {keyword}=req.query;
    let query={};
    if(keyword){
        //query.title=new RegExp(keyword);
        //匹配标题或者内容中 有查询的字符串
        query['$or']=[{
            title:new RegExp(keyword) //title 符合正则
        },{
            content:new RegExp(keyword)
        }];
    }
    //populate 可以把一个字段从字符串转成对象
    //查询所有的文章  articles是数组
     Article.find(query).populate('user').exec(function (err,articles) {
         //路径是相对路径  相对于模板路径
         res.render('index',{title:'首页',keyword,articles});
         //console.log(articles);
     });
});
module.exports=router;