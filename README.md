#新建一个项目
```
npm init -y
```
这个命令会创建一个package.json文件
#安装依赖的模块
```
npm install body-parser cookie-parser debug ejs express express-session morgan serve-favicon connect-mongo connect-flash mongoose multer async bootstrap -S
```
- --save-dev = -D
- --save = -S

#创建并初始化git
```
git init
git add -A
git commit -m"1.初始化项目和依赖的模块"
git remote add origin https://github.com/ainibaoer2014/myblog.git
git push -u origin master
```
#创建服务
express + mongoose
```
let express=require('express');
let app=express();
app.listen(8080);
```
#跑通路由
```
 路由：
 / 首页
 /user/signup  注册
 /user/signin  登录
 /user/signout  退出
 /article/add    发表文章
```
#引入模板引擎
```
//设置模板引擎为html
app.set('view engine','html');
//指定模板的存放根目录  相对于views目录
app.set('views',path.resolve('views'));
//指定对于html类型的模板使用ejs模板来进行渲染
app.engine('html',require('ejs').__express);

```
#编写步骤
> 1. 初始化项目和依赖的模块
> 2. 跑通路由
> 3. 使用bootstrap渲染模板
> 4. 实现用户注册的功能
> 5. 实现用户登录的功能
> 6. 实现会话功能并控制菜单的显示
> 7. 增加判断登录状态的中间件
> 8. 成功和失败时的消息提示
> 9. 发表文章
>10. 查看文章详情  
>11. 删除文章
>12. 修改文章
>13. 搜索文章和分页