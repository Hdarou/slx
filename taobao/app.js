var express = require('express');
var path = require('path');
//cookie处理模块
var cookieParser = require('cookie-parser');
//引入解析post参数的模块
var bodyParser=require('body-parser');
//引入解析express-session的模块
var session=require('express-session');

//引用路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

//var testRouter = require('./routes/test');

var app = express();

//  格式
app.use(session({
	    name:'tianmao',
	    secret:'tianmao',
	    cookie:{
	    	maxAge:80000000000 //
	    },
	    resave:false, //每次请求是否重新设置session
		//指每次请求重新设置 session cookie ,假如你设置的 cookie有效 10分钟    
	    saveUninitialized:false //每次请求是否初始化session	    
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//配置静态资源路径
app.use(express.static(path.join(__dirname, 'public')));

//使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', productRouter);

//app.use('/test', testRouter);


module.exports = app;
