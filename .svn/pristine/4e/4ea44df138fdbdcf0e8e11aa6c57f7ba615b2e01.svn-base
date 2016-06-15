var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('test', { title: 'Hello MyNodeJs' });
    res.sendFile(__dirname+'/view/test.html',{
        title: 'Hello MyNodeJs'
    });
});

module.exports = router;
