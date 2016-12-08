// 载入常用nodejs模块
var path = require('path');

// favicon.ico 支持
var favicon = require('serve-favicon');
// 日志输出
var logger = require('morgan');
// post参数解析
var bodyParser = require('body-parser');
// flash支持
var flash = require('connect-flash');

// express 框架
var express = require('express');
var app = express();
// 控制器
var expressController = require('express-controller');
// cookie
var cookieParser = require('cookie-parser');
// session
var session = require('express-session');

// 动态注入所有实体模型
var models = require(path.join(__dirname, 'models'));

// 创建express Router 实例
var router = express.Router();

// 视图加载
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 静态文件载入
app.use(express.static(path.join(__dirname, 'public')));
// 上传文件
app.use(express.static(path.join(__dirname, 'uploads')));
// 设置icon图标（如果没有favicon.icon）可以注释这一行代码
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//flash支持
app.use(flash());

// 日志输出
app.use(logger('dev'));

// 处理非get提交数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 会话处理
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

// 设置控制器文件夹并绑定到路由
expressController
	.setDirectory(__dirname + '/controllers')
	.bind(router);

// 错误处理
// 404处理
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// 错误或者服务器500异常处理
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	// 默认指定的是views/share/error.ejs
	res.render('share/error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	});
});

// 设置端口
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('应用启动地址： http://%s:%s', host, port);
});

// 引入socket 服务端模块。如无需即时通讯，注释即可
require(path.join(__dirname, 'utils/socketServer.js')).listen(server);