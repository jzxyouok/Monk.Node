// 载入常用nodejs模块
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

// express 框架
var express = require('express');
var expressController = require('express-controller');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// 动态注入所有实体模型
var models = require(path.join(__dirname, 'models'));

// 创建express 实例
var app = express();
var router = express.Router();

// 视图加载
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 静态文件载入
app.use(express.static(path.join(__dirname, 'public')));
// 设置icon图标（如果没有favicon.icon）可以注释这一行代码
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//flash支持
app.use(flash());

app.use(logger('dev'));
// 传输数据json处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie处理
app.use(cookieParser());
// session处理
app.use(session({
	secret: 'monknode',
	cookie: { maxAge: 60000 },
	resave: true,
	saveUninitialized: true
}));

// 路由控制
app.use(router);

// 404处理
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 错误或者服务器500异常处理
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	});
});

// 绑定控制器
expressController
	.setDirectory(__dirname + '/controllers')
	.bind(router);

// 端口启动
app.listen(3000);