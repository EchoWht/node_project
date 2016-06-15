var express = require('express');
var router = express.Router();


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
    /* GET users listing. */
    router.get('/', function(req, res, next) {
        // res.send(
        //     rows
        // );
        res.render('hello',  {result:rows} );
    });
});





module.exports = router;
