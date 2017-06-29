let mongoose=require('mongoose');
mongoose.Promise=Promise;
//当使用用户表中的用户ID时，定义变量objectId
let ObjectId=mongoose.Schema.Types.ObjectId;
//连接数据库  提前不用创建  会自动创建
//将数据库的链接地址 放在config配置文件中
//好处：当要修改数据库的链接地址时，只需修改config.js中的链接地址
let db=mongoose.connect(require('../config').dbUrl);
//定义用户集合的结构骨架  规定了用户集合中的文档的属性和类型
let UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
//定义用户模型
let User=mongoose.model('User',UserSchema);
//在导出对象上增加一个属性(将对象模型挂载在导出对象上)
//由于 可能在导出对象模型上还要挂载 Article等对象模型，所以不能将导出对象=User

module.exports.User=User;

//定义文章集合结构的骨架
let ArticleSchema=new mongoose.Schema({
    title:String,//标题
    content:String,//正文
    createAt:{type:Date,default:Date.now},//创建时间
    //user是一个外键，引用另一个集合(User)的主键
    user:{type:ObjectId,ref:'User'}//作者，引用用户表的主键(_id)
});
let Article=mongoose.model('Article',ArticleSchema);

module.exports.Article=Article;