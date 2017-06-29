let express=require('express');
let path=require('path');
let bodyParser=require('body-parser');
//会话中间件
let session=require('express-session');
//消息提示中间件
let flash=require('connect-flash');
let MongoStore=require('connect-mongo')(session);
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
//将public作为静态文件的根目录
app.use(express.static(path.resolve('public')));
app.use(session({
    resave:true,//每次客户端请求到服务器都会保存session
    secret:'zfpx',//用来加密cookie的，防止cookie被客户端篡改
    cookie:{
        maxAge:3600*1000,//指定cookie的过期时间
    },
    saveUninitialized:true,//保存未初始化的session
    store:new MongoStore({
        //将数据库的链接地址 放在config配置文件中
        //好处：当要修改数据库的链接地址时，只需修改config.js中的链接地址
        url:require('./config').dbUrl
    })//将数据放在数据库中，即使重启服务器，登录状态，还存在
}));
//切记：此中间件要放在session的后面，因为它要依赖session  使用了flash中间件会多一个req.flash(type,msg) 两个参数赋值   req.flash(type) 一个参数取值
app.use(flash());
//解析客户端提交过来的请求体 并转成对象赋值给req.body
app.use(bodyParser.urlencoded({extended:true}));
let index=require('./routes/index.js');
let user=require('./routes/user.js');
let article=require('./routes/article.js');
app.use(function (req,res,next) {
    //真正渲染的是res.locals  放公共模板都需要的变量
    res.locals.user=req.session.user;
    res.locals.keyword='';
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
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
