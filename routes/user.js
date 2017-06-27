let express=require('express');
//将model中的导出对象导入  并解构 赋值
let {User}=require('../model');
let {checkLogin,checkNotLogin}=require('../auth');
let router=express.Router();
/*
* 实现用户注册:
* 1.绘制注册页面的模板(username password email)
* 2.实现提交用户的路由 post/user/signup
* 3.在路由中获取请求体，然后把此用户信息保存在数据库中
* 4.保存完毕后跳转到登录页
* */
//注册页
router.get('/signup',checkNotLogin,function (req,res) {
    res.render('user/signup',{title:"注册"});
});
router.post('/signup',checkNotLogin,function (req,res) {
    let user=req.body;//请求体对象的三个属性(username,password,email)
    //将提交的用户数据存在数据库中
    User.create(user,function (err,doc) {
        if(err){
            //保存失败，回到上个页面从新保存
            res.redirect('back');
        }else{
            res.redirect('/user/signin');
        }
    });
});
//登录页
router.get('/signin',checkNotLogin,function (req,res) {
   res.render('user/signin',{title:"登录"});
});
//用户登录
router.post('/signin',checkNotLogin,function (req,res) {
    let user=req.body;//得到用户提交的表单
    User.findOne(user,function (err,doc) {
        if(err){
            res.redirect('back');
        }else{
            if(doc){
                //向会话中写入属性user=doc
                req.session.user=doc;
                res.redirect('/');
            }else{
                res.redirect('back');
            }
        }
    });
});
//退出登录
router.get('/signout',checkLogin,function (req,res) {
   req.session.user=null;
   res.redirect('/user/signin');
});
module.exports=router;