var express = require('express');
var bodyParser = require('body-parser');

// 创建WEB应用
var app = express();
// 解析urlencode编码格式的请求体
app.use(bodyParser.urlencoded({extended: false}));

// 根路径请求
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/home.html');
});

// 处理登录请求
app.get('/login', function(req, res) {
	if ('admin' == req.body.account && '123' == req.body.password) {
		res.send('login success！');
	} else {
		res.send('failed, bad account or password!');
	}
});

// 启动服务，监听80端口
app.listen(8888);