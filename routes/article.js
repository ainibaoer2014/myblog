let express=require('express');
let {checkLogin,checkNotLogin}=require('../auth');
let router=express.Router();
router.get('/add',checkLogin,function (req,res) {
    res.render('article/add',{title:"发表文章"});
});
module.exports=router;