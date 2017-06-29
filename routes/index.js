let express=require('express');
let {Article}=require('../model');
//调用Router方法 得到一个路由中间实例
let router=express.Router();
//当客户端通过GET请求的方式访问/路径的时候，会交由对应的函数来处理
router.get('/',function (req,res) {
    //获取查询字符串对象，并将keyword关键字 pageNum当前页码  pageSize每页条数解构出来
    let {keyword,pageNum,pageSize}=req.query;
    //如果 页数 和 每页的条数 不是有效数字 给一个默认数字  否则 将数字字符串转为数字
    pageNum=isNaN(pageNum)?1:parseInt(pageNum);
    pageSize=isNaN(pageSize)?3:parseInt(pageSize);
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
    //总条数
    Article.count(query,function (err,count) {
        //将按照条件查询到的数据  按照时间倒叙排列
        Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function (err,articles) {
            //路径是相对路径  相对于模板路径
            res.render('index',{
                title:'首页',
                keyword,//关键字
                pageNum,//当前页码
                pageSize,//每页条数
                totalPages:Math.ceil(count/pageSize),//总页数
                articles//当前页的的文章
            });
            //console.log(articles);
        });
    });

});
module.exports=router;