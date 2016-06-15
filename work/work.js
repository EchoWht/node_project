/**
 * Created by Administrator on 2016-05-29.
 */
var express = require('express');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
//var nodemailer = require('nodemailer');
var nodemailer = require('nodemailer');

var mongoose = require('mongoose');

var app = express();
var words = require('./lib/fortune');
/*引入证书*/
var credentials = require('./lib/credentials.js');
app.set('port', process.env.PORT || 8888);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession());
// /设置 handlebars 视图引擎
var handlebars = require('express3-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*模型 Work*/
var db = mongoose.connect('mongodb://localhost/works');
var Work = require('./models/workmodel');

//查找数据
/*路由：work*/
app.get('/works', function (req, res) {
    if (req.session.username) {
        console.log('Login AS:' + req.session.username);
    } else {
        res.redirect(303, '/');
        return;
    }
    var now = new Date();
    var result = Work.find(
        {
            date: new RegExp(now.toLocaleDateString()),//正则表达，返回当天日期
            username: req.session.username
        },
        function (err, works) {//
            var content = {
                works: works.map(function (works) {
                    return {
                        _id: works._id,
                        username: works.username,
                        description: works.description,
                        date: works.date,
                        tag: works.tag,
                        status: works.status
                    }
                })
            };
            res.render('work/works', content);
        })
});
//添加数据
/*路由：提交表单*/
app.post('/add-work', function (req, res) {
    var now = new Date();
    new Work({
        username: req.session.username,
        date: now.toLocaleString(),
        description: req.body.description,
        tag: req.body.tag
    }).save(function (err) {
            if (err)throw err;
            console.log('成功添加一条信息');
        }
    );
    res.redirect(303, '/works');
});
/*路由：修改work 修改数据*/
app.post('/work-complete', function (req, res) {
    Work.update(
        {_id: req.body.id},
        //{username:req.session.username},
        {status: 1},
        {multi: false},
        function (err, rows_updated) {
            if (err)throw err;
            console.log('Upadte success!');
            res.json({success: true});
        }
    );
});
/*路由：删除work*/
app.post('/work-remove', function (req,res) {
    Work.findById(req.body.id,function (err,work) {
        work.remove();
        res.json({success: true});
    })
});
/*发送邮件*/
/*var emailService = require('./lib/email.js')(credentials);
 emailService.send('echowht@qq.com', 'Hood River tours on sale today!',
 'Get \'em while they\'re hot!');*/

/*路由:主页*/
app.get('/', function (req, res) {
    //cookie
    res.cookie('monster', 'nom nom');
    res.cookie('signed_monster', 'nom nom', {signed: true});
    //删除cookie res.clearCookie('monster');
    //session
    // req.session.username='Echo';
    //delete req.session.username;
    res.render('home',
        {   layout: 'home',
            title: 'Homepage',
            words: words.getFortune(),
            csrf: 'CSRF token goes here'
            // username:req.session.username
        });
});
/*路由：登录post*/
app.post('/login', function (req, res) {
    req.session.username = req.body.username;
    res.send(req.session.username);
});
/*路由:about*/
app.get('/about', function (req, res) {
    console.log(req.session.username);
    res.render('about', {title: 'About', username: req.session.username});
});
/*路由：文件上传*/
app.get(
    '/file', function (req, res) {
        var now = new Date();
        res.render('file/file',
            {
                title: 'File', year: now.getFullYear(), month: now.getMonth()
            })
    }
);
app.post('/file/upload/:year/:month', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});
/*路由:主页表单提交页面*/
app.post(
    '/savework', function (req, res) {
        console.log('Form (from querystring): ' + req.query.form);
        console.log('CSRF token (from hidden form field): ' + req.body._csrf);
        console.log('Name (from visible form field): ' + req.body.name);
        console.log('Email (from visible form field): ' + req.body.email);
        res.redirect(303, '/thank-you');
    }
);
/*路由：谢谢界面*/
app.get(
    '/thank-you', function (req, res) {
        res.send('谢谢！');
    }
);
/*路由：测试不用主布局*/
app.get('/nolayout', function (req, res) {
        res.render('nolayout', {layout: null});
    }
);
// 404 catch-all 处理器（中间件）
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 错误处理器（中间件）
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
