let express=require('express');
let {checkLogin,checkNotLogin}=require('../auth');
let {Article}=require('../model');
let router=express.Router();
router.get('/add',checkLogin,function (req,res) {
    res.render('article/add',{title:"发表文章",article:{}});
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
            //console.log(doc);
        }
    });
});
//文章详情的路由
//:_id  通过路径参数来获取id值
router.get('/detail/:_id',function (req,res) {
    let _id=req.params._id;//获取路径参数_id
    Article.findById(_id,function (err,article) {
        if(err){
            req.flash('error',err);
        }else{
            res.render('article/detail',{title:'文章详情',article});
        }
    });
});

//删除文章路由
router.get('/delete/:_id',function (req,res) {
    let _id=req.params._id;//要删除的文章id
    Article.remove({_id},function (err,result) {
        if(err){
            req.flash('error',err);
            req.redirect('back');
        }else{
            req.flash('success','删除文章成功！');
            res.redirect('/');
        }
    });
});

//更新/编辑文章路由
router.get('/update/:_id',function (req,res) {
    let _id=req.params._id;
    Article.findById(_id,function (err,article) {
        //增加/更新可以复用一个模板
        res.render('article/add',{title:'更新文章',article});
    });
});

//编辑/更新文章后提交的路由
router.post('/update/:_id',function (req,res){
    let _id=req.params._id;
    let article=req.body;
    //虽然更新时，只有两个字段，增加文章时有四个字段，但是，它只会更新同名属性，不会全部覆盖整个对象
    Article.update({_id},article,function (err,result) {
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            req.flash('success','文章更新成功!');
            //更新成功后，跳到详情页，如果跳到首页，由于文章太多查找不方便
            res.redirect('/article/detail/'+_id);
        }
    });
});
module.exports=router;