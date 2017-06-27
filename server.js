let express=require('express');
let path=require('path');
let bodyParser=require('body-parser');
//会话中间件
let session=require('express-session');
let app=express();
//设置模板引擎为html
app.set('view engine','html');
//指定模板的存放根目录  相对于views目录
app.set('views',path.resolve('views'));
//指定对于html类型的模板使用ejs模板来进行渲染
app.engine('html',require('ejs').__express);
//配置静态文件中间件会拦截到客户端对于静态文件的请求，如bootstrap.css，然后会在当前目录的node_modules目录下找该文件，如果能找到则返回客户端并结束请求
app.use(express.static(path.resolve('node_modules')));
//在使用了该会话中间件后，会在对象上增加req.session属性，它也是一个对象
app.use(session({
    resave:true,//每次客户端请求到服务器都会保存session
    secret:'zfpx',//用来加密cookie的，防止cookie被客户端篡改
    saveUninitialized:true//保存未初始化的session
}));
//解析客户端提交过来的请求体 并转成对象赋值给req.body
app.use(bodyParser.urlencoded({extended:true}));
let index=require('./routes/index.js');
let user=require('./routes/user.js');
let article=require('./routes/article.js');
app.use(function (req,res,next) {
    //真正渲染的是res.locals  放公共模板都需要的变量
    res.locals.user=req.session.user;
    next();
});
/*
* 路由：
* / 首页
* /user/signup  注册
* /user/signin  登录
* /user/signout  退出
* /article/add    发表文章
*
*
* */
app.use('/',index);
//当客户端请求的路由以/users开头的 交由users路由中间件来处理
app.use('/user',user);
app.use('/article',article);
app.listen(8080);
