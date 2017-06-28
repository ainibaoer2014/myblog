let express=require('express');
//将model中的导出对象导入  并解构 赋值
let {User}=require('../model');
let {checkLogin,checkNotLogin}=require('../auth');
let router=express.Router();
//上传文件/图片时 使用的中间件
let multer=require('multer');
//上传文件/图像的存放路径
let uploads=multer({dest:'./public/uploads'});
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
//当表单里只有一个上传字段时，使用single('avatar')  avatar是上传表单控件的name属性的值
//当使用uploads.single('avatar)后，多两个属性  req.file req.body
router.post('/signup',checkNotLogin,uploads.single('avatar'),function (req,res) {
    // console.log(req.file);
    // console.log(req.body);
    let user=req.body;//请求体对象的三个属性(username,password,email)
    user.avatar=`/uploads/${req.file.filename}`;
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

/*
分析：使用了multer中间件 并指定了上传文件的存放路径 当用户上传一个文件时 uploads.single('avatar') 多出的两个对象
      req.file  req.body  打印出来的这两个对象中的内容的分析
*
* req.file 对象
{ fieldname: 'avatar', //上传文件的表单控件中name属性的属性值
 originalname: '1.jpg',//上传的文件名
 encoding: '7bit',
 mimetype: 'image/jpeg',//上传文件的MIME类型
 destination: './public/uploads',//在服务器上保存的文件目录
 filename: '26597143b61d074f1d90e415e7e47887',//在服务器上保存的文件名  Buffer类型
 path: 'public\\uploads\\26597143b61d074f1d90e415e7e47887',//服务器上保存的文件的路径
 size: 68259 }//文件的大小
*
* req.body对象
 { username: 'jaylina',
 password: '888',
 email: '756367019@qq.com' }
* */
