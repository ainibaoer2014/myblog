let express=require('express');
//调用Router方法 得到一个路由中间实例
let router=express.Router();
//当客户端通过GET请求的方式访问/路径的时候，会交由对应的函数来处理
router.get('/',function (req,res) {
     //路径是相对路径  相对于模板路径  放特有的变量
     res.render('index',{title:'珠峰博客'});
});
module.exports=router;