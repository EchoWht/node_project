/**
 * Created by Administrator on 2016-06-01.
 */
var express=require('express');
var router=express.Router();

router.get(
    '/',function (req,res) {
        res.send('' +
            '<form action="/login" method="post">' +
            '<input type="text" name="username">' +
            '<button type="submit"></button>' +
            '</form>');
    }
);
router.get(
    '/hello',function (req,res) {
        res.send('Hi i am TEST');
        console.log('test');
    }
);
router.post(
    '/login',function (req,res) {

        res.send('Hi i am TEST');
    }
);
router.get('/ce*',function (req,res) {
    res.send('ce后面输什么都是这一页');
});

module.exports=router;