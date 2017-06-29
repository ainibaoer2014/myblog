let express=require('express');
let {checkLogin,checkNotLogin}=require('../auth');
let {Article}=require('../model');
let router=express.Router();
router.get('/add',checkLogin,function (req,res) {
    res.render('article/add',{title:"发表文章"});
});
router.post('/add',checkLogin,function (req,res) {
    let article=req.body;
    //当前这篇文章的作者是 当前的登录用户
    article.user=req.session.user._id;
    Article.create(article,function (err,doc) {
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            req.flash('success','文章发表成功!');
            res.redirect('/');
            console.log(doc);
        }
    });
});
module.exports=router;