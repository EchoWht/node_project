/**
 * Created by Administrator on 2016/5/14.
 */
var express=require("express");
var bodyParser = require('body-parser');

// 创建WEB应用
var app = express();
// 解析urlencode编码格式的请求体
app.use(bodyParser.urlencoded({extended: false}));

// 根路径请求
app.use(express.static('public'));//设置模板文件路径，css js
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

/**/


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'test'
});

connection.connect();

connection.query('SELECT * FROM `hello`', function(err, rows, fields) {
    if (err) throw err;
    app.get('/u',function (req,res) {
        //res.sendFile(__dirname + '/public/u.html');
        res.send(
            rows

        );
        console.log("ok");
    })
});
app.get('/test',function(req,res){
    res.send('Hi')
})

// connection.query('INSERT INTO `hello` (`id`, `name`) VALUES (?, ?)',["5","hi"],function (err, rows, fields) {
//     if (err){
//         throw err;
//         // console.log(err);
//     }
// })
connection.end();
/**/
/*错误处理*/
// app.use(function(req, res, next) {
//     res.status(404).send('⊙︿⊙404');
// });
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
var port=8888;
app.listen(port);
console.log("服务已启动在"+port+"端口....");

