let mongoose=require('mongoose');
//连接数据库  提前不用创建  会自动创建
let db=mongoose.connect("mongodb://127.0.0.1:27017/myblog");
//定义用户集合的结构骨架  规定了用户集合中的文档的属性和类型
let UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
//定义用户模型
let User=mongoose.model('User',UserSchema);
//在导出对象上增加一个属性(将对象模型挂载在导出对象上)
//由于 可能在导出对象模型上还要挂载 Article等对象模型，所以不能将导出对象=User
module.exports.User=User;