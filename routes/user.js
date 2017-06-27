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
        if(err){//表示注册失败
            //消息的类型 error，内容是用户注册失败
            req.flash('error','用户在注册失败');
            //保存失败，回到上个页面从新保存
            res.redirect('back');
        }else{//注册成功
            //消息类型success ,内容是用户注册成功
            req.flash('success','用于注册成功');
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
        if(err){//登录查询失败 操作数据库失败 数据库连接失败 没连上数据库
            req.flash('error','登录失败');
            res.redirect('back');
        }else{//登录查询成功
            if(doc){//登录查询成功
                //多次存入消息  取出来的消息是一个数组
                req.flash('success','登录成功');
                //向会话中写入属性user=doc
                req.session.user=doc;
                res.redirect('/');
            }else{//登录失败  数据库连接成功  但是数据库中没有对应的用户名和密码的数据
                req.flash('error','用户名或密码不正确');
                res.redirect('back');
            }
        }
    });
});
//退出登录
router.get('/signout',checkLogin,function (req,res) {
   req.session.user=null;
   req.flash('success','用户退出成功');
   res.redirect('/user/signin');
});
module.exports=router;