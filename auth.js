//进入路由之前要求此用户未登录，如果未登录可继续访问路由，如果已登录,跳回首页，提示已经登录成功(目的：针对登录页，防止重复登录，只有没有登陆过，才能继续登录操作，登陆过，则返回首页)
module.exports.checkNotLogin=function (req,res,next) {
    if(req.session.user){
        res.redirect('/');
    }else{
        next();
    }
};
//如果要求此路由登陆后才能访问，会判断当前的登录状态，如果已登录，则正常继续访问，否则返回登录页(目的：针对非登录页，其他页面，只有登录后，才能继续操作，否则，返回登录页)
module.exports.checkLogin=function (req,res,next) {
    if(req.session.user){
        next();
    }else{
        res.redirect('/user/signin');
    }
};